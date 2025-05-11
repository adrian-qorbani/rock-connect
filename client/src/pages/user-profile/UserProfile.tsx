// src/components/user-profile/UserProfile.tsx
import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  TextField,
  Typography,
  ImageList,
  ImageListItem,
  CircularProgress,
} from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";
import { useCurrentUser } from "../../hooks/graphql/useUserQueries";
import { useUpdateUser } from "../../hooks/graphql/useUserMutation";
import { Post } from "../../types/graphql.types";
import { StatItem } from "../../components/common/StatItem";
// import { formatNumber } from '../../utils/helpers';

const UserProfile: React.FC = () => {
  const { user, loading, error, refetch } = useCurrentUser();
  const { updateUser, loading: updateLoading } = useUpdateUser();
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({
    username: "",
    bio: "",
    profilePicture: "",
  });

  useEffect(() => {
    if (user) {
      setEditedUser({
        username: user.username,
        bio: user.bio || "",
        profilePicture: user.profilePicture || "",
      });
    }
  }, [user]);

  const handleEdit = () => setEditMode(true);

  const handleSave = async () => {
    try {
      await updateUser({
        username: editedUser.username,
        bio: editedUser.bio,
        profilePicture: editedUser.profilePicture,
      });
      await refetch();
      setEditMode(false);
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  const handleCancel = () => {
    if (user) {
      setEditedUser({
        username: user.username,
        bio: user.bio || "",
        profilePicture: user.profilePicture || "",
      });
    }
    setEditMode(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <CircularProgress />;
  if (error)
    return (
      <Typography color="error">
        Error loading profile: {error.message}
      </Typography>
    );
  if (!user) return <Typography>User not found</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Card sx={{ border: "none", boxShadow: "none" }}>
        <CardHeader
          title="User Profile"
          action={
            !editMode ? (
              <IconButton onClick={handleEdit} color="primary">
                <Edit />
              </IconButton>
            ) : (
              <Box>
                <IconButton
                  onClick={handleSave}
                  color="success"
                  disabled={updateLoading}
                >
                  <Save />
                </IconButton>
                <IconButton onClick={handleCancel} color="error">
                  <Cancel />
                </IconButton>
              </Box>
            )
          }
        />

        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              gap: 4,
              mb: 4,
            }}
          >
            <Avatar
              src={editedUser.profilePicture || "/default-avatar.png"}
              sx={{
                width: 150,
                height: 150,
                border: "2px solid",
                borderColor: "primary.main",
              }}
            />

            <Box sx={{ flex: 1, width: "100%" }}>
              {editMode ? (
                <>
                  <TextField
                    fullWidth
                    label="Username"
                    name="username"
                    value={editedUser.username}
                    onChange={handleChange}
                    margin="normal"
                  />
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    value={editedUser.bio}
                    onChange={handleChange}
                    margin="normal"
                    multiline
                    rows={3}
                  />
                  <TextField
                    fullWidth
                    label="Profile Picture URL"
                    name="profilePicture"
                    value={editedUser.profilePicture}
                    onChange={handleChange}
                    margin="normal"
                  />
                </>
              ) : (
                <>
                  <Typography variant="h4" gutterBottom>
                    {user.username}
                  </Typography>
                  {user.bio && (
                    <Typography variant="body1" gutterBottom>
                      {user.bio}
                    </Typography>
                  )}

                  <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
                    <StatItem value={user.postsCount} label="Posts" />
                    <StatItem value={user.followersCount} label="Followers" />
                    <StatItem value={user.followingCount} label="Following" />
                  </Box>
                </>
              )}
            </Box>
          </Box>

          {!editMode && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom>
                Posts
              </Typography>
              {user.posts && user.posts.length > 0 ? (
                <ImageList cols={3} gap={8}>
                  {user.posts.map((post) => (
                    <PostItem key={post.id} post={post} />
                  ))}
                </ImageList>
              ) : (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mt: 2 }}
                >
                  No posts yet.
                </Typography>
              )}
            </>
          )}

          {editMode && (
            <Box sx={{ textAlign: "right", mt: 3 }}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Cancel />}
                onClick={handleCancel}
                sx={{ mr: 2 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                startIcon={<Save />}
                onClick={handleSave}
                disabled={updateLoading}
              >
                {updateLoading ? "Saving..." : "Save Changes"}
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

const PostItem: React.FC<{ post: Post }> = ({ post }) => (
  <ImageListItem>
    <img
      src={post.image || "https://source.unsplash.com/random/300x300/?post"}
      alt={post.title}
      loading="lazy"
      style={{
        borderRadius: 8,
        width: "100%",
        aspectRatio: "1/1",
        objectFit: "cover",
      }}
    />
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        p: 1,
        background: "rgba(0, 0, 0, 0.5)",
        color: "white",
      }}
    >
      <Typography variant="subtitle2">{post.title}</Typography>
    </Box>
  </ImageListItem>
);

export default UserProfile;
