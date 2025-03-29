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
import { useGetCurrentUserQuery } from "../../generated/graphql"; 

interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
}

interface UserProfileData {
  username: string;
  bio?: string;
  profilePicture?: string;
}

const UserProfile: React.FC = () => {
  const { data, loading, error } = useGetCurrentUserQuery({
    fetchPolicy: "cache-and-network",
    context: {
      credentials: 'include',
    },
  });

  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<UserProfileData>({
    username: "",
    bio: "",
    profilePicture: "",
  });

  useEffect(() => {
    if (data?.getCurrentUser) {
      setEditedUser({
        username: data.getCurrentUser.username,
        bio: data.getCurrentUser.bio || "",
        profilePicture: data.getCurrentUser.profilePicture || "",
      });
    }
  }, [data]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    // TODO: Implement mutation to update user
    setEditMode(false);
  };

  const handleCancel = () => {
    if (data?.getCurrentUser) {
      setEditedUser({
        username: data.getCurrentUser.username,
        bio: data.getCurrentUser.bio || "",
        profilePicture: data.getCurrentUser.profilePicture || "",
      });
    }
    setEditMode(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading profile: {error.message}</Typography>;

  const user = data?.getCurrentUser;
  if (!user) return <Typography>User not found</Typography>;

  // Use actual posts from the user data
  const userPosts: Post[] = user.posts?.map(post => ({
    id: Math.random().toString(), // Fallback ID if not available
    title: post.title,
    content: post.content,
    // If you have images in posts, add them here
    image: "https://source.unsplash.com/random/300x300/?post" // Fallback image - replace with actual post image if available
  })) || [];

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Card
        sx={{
          border: "none",
          boxShadow: "none",
        }}
      >
        <CardHeader
          title="User Profile"
          action={
            !editMode ? (
              <IconButton onClick={handleEdit} color="primary">
                <Edit />
              </IconButton>
            ) : (
              <Box>
                <IconButton onClick={handleSave} color="success">
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
                    value={editedUser.bio || ""}
                    onChange={handleChange}
                    margin="normal"
                    multiline
                    rows={3}
                  />
                  <TextField
                    fullWidth
                    label="Profile Picture URL"
                    name="profilePicture"
                    value={editedUser.profilePicture || ""}
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

                  {/* Social Stats */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: 3,
                      mt: 2,
                      "& > div": {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      },
                    }}
                  >
                    <div>
                      <Typography variant="h6">
                        {formatNumber(user.postsCount)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Posts
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="h6">
                        {formatNumber(user.followersCount)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Followers
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="h6">
                        {formatNumber(user.followingCount)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Following
                      </Typography>
                    </div>
                  </Box>
                </>
              )}
            </Box>
          </Box>

          {/* Posts Grid */}
          {!editMode && userPosts.length > 0 && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom>
                Posts
              </Typography>
              <ImageList cols={3} gap={8}>
                {userPosts.map((post) => (
                  <ImageListItem key={post.id}>
                    <img
                      src={post.image}
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
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 1,
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                      }}
                    >
                      <Typography variant="subtitle2">
                        {post.title}
                      </Typography>
                    </Box>
                  </ImageListItem>
                ))}
              </ImageList>
            </>
          )}

          {!editMode && userPosts.length === 0 && (
            <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
              No posts yet.
            </Typography>
          )}

          <Divider sx={{ my: 3 }} />

          {editMode && (
            <Box sx={{ textAlign: "right" }}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Cancel />}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<Save />}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfile;