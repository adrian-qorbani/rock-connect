import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  Avatar,
  Divider,
  List,
  ListItem,
  IconButton,
  TextField,
  Button,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Edit,
  Save,
  Cancel,
  Favorite,
  ChatBubbleOutline,
  CloudUpload,
} from "@mui/icons-material";
import { formatDate } from "../../utils/formatDate";
import { useUpdateUser } from "../../hooks/graphql/useUserMutation";
import { useCurrentUser } from "../../hooks/graphql/useUserQueries";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, loading, error, refetch } = useCurrentUser();
  const { updateUser, loading: updateLoading } = useUpdateUser();
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({
    username: "",
    bio: "",
    profilePicture: "",
  });
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  useEffect(() => {
    if (user) {
      setEditedUser({
        username: user.username,
        bio: user.bio || "",
        profilePicture: transformImageUrl(user.profilePicture) || "",
      });
    }
  }, [user]);

  const transformImageUrl = (url?: string) => {
    if (!url) return "";
    return url.replace("minio:9000", "localhost:9000");
  };

  const handlePostClick = (uuid: string) => navigate(`/posts/${uuid}`);
  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    if (user) {
      setEditedUser({
        username: user.username,
        bio: user.bio || "",
        profilePicture: transformImageUrl(user.profilePicture) || "",
      });
    }
    setEditMode(false);
  };

  const handleSave = async () => {
    try {
      await updateUser({
        username: editedUser.username,
        bio: editedUser.bio,
        profilePicture: editedUser.profilePicture,
      });
      await refetch();
      setEditMode(false);
      showSnackbar("Profile updated successfully", "success");
    } catch (err) {
      console.error("Failed to update user:", err);
      showSnackbar("Failed to update profile", "error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadDialogOpen(true);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch("http://localhost:3000/file-manager", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      const imageUrl = transformImageUrl(data.image_url);

      setEditedUser((prev) => ({ ...prev, profilePicture: imageUrl }));
      setUploadDialogOpen(false);
      showSnackbar("Profile picture updated", "success");
    } catch (error) {
      console.error("Upload error:", error);
      showSnackbar("Failed to upload image", "error");
    } finally {
      setUploading(false);
    }
  };

  const showSnackbar = (message: string, severity: "success" | "error") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;
  if (error)
    return (
      <Typography color="error">
        Error loading profile: {error.message}
      </Typography>
    );
  if (!user) return <Typography>User not found</Typography>;
  console.log(editedUser.profilePicture);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: { xs: 1, sm: 3 } }}>
      <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Box sx={{ p: 3, display: "flex", alignItems: "center" }}>
          <Box sx={{ position: "relative", mr: 3 }}>
            <Avatar
              src={
                `http://${transformImageUrl(editedUser.profilePicture)}` ||
                "/default-avatar.png"
              }
              sx={{
                width: 100,
                height: 100,
                border: "3px solid",
                borderColor: "primary.main",
              }}
            />
            {editMode && (
              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: "background.paper",
                  boxShadow: 1,
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <CloudUpload />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </IconButton>
            )}
          </Box>

          {/* User Info */}
          <Box sx={{ flex: 1 }}>
            {editMode ? (
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={editedUser.username}
                onChange={handleChange}
                margin="dense"
                sx={{ mb: 2 }}
              />
            ) : (
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {user.username}
              </Typography>
            )}

            <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
              <Typography variant="body1">
                <strong>{user.postsCount}</strong> Posts
              </Typography>
              <Typography variant="body1">
                <strong>{user.followersCount}</strong> Followers
              </Typography>
              <Typography variant="body1">
                <strong>{user.followingCount}</strong> Following
              </Typography>
            </Box>

            {editMode ? (
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                value={editedUser.bio}
                onChange={handleChange}
                multiline
                rows={3}
              />
            ) : (
              user.bio && <Typography paragraph>{user.bio}</Typography>
            )}
          </Box>
          <Box>
            {editMode ? (
              <>
                <IconButton
                  onClick={handleSave}
                  color="primary"
                  disabled={updateLoading}
                >
                  <Save />
                </IconButton>
                <IconButton onClick={handleCancel} color="error">
                  <Cancel />
                </IconButton>
              </>
            ) : (
              <Button
                startIcon={<Edit />}
                onClick={handleEdit}
                variant="outlined"
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </Box>

        <Divider />
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Posts
          </Typography>

          {user.posts?.length > 0 ? (
            <List>
              {user.posts.map((post) => (
                <ListItem
                  key={post.id}
                  onClick={() => handlePostClick(post.uuid)}
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: 1,
                    cursor: "pointer",
                    "&:hover": { boxShadow: 3 },
                    transition: "all 0.2s ease",
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography variant="h6">{post.title}</Typography>
                      <Chip
                        label={formatDate(post.createdAt)}
                        size="small"
                        variant="outlined"
                      />
                    </Box>

                    <Typography paragraph>{post.content}</Typography>

                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Favorite color="error" sx={{ mr: 0.5 }} />
                        <Typography>{post.likesCount}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ChatBubbleOutline sx={{ mr: 0.5 }} />
                        <Typography>{post.commentsCount}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </ListItem>
              ))}
            </List>
          ) : (
            <Box
              sx={{
                textAlign: "center",
                p: 4,
                border: "1px dashed",
                borderRadius: 2,
              }}
            >
              <Typography variant="body1" color="text.secondary">
                No posts yet
              </Typography>
            </Box>
          )}
        </Box>
      </Card>
      <Dialog
        open={uploadDialogOpen}
        onClose={() => !uploading && setUploadDialogOpen(false)}
      >
        <DialogTitle>Upload Profile Picture</DialogTitle>
        <DialogContent>
          {selectedFile && (
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography>{selectedFile.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setUploadDialogOpen(false)}
            disabled={uploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            color="primary"
            disabled={uploading}
            startIcon={uploading ? <CircularProgress size={20} /> : null}
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserProfile;
