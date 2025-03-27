import React, { useState } from "react";
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
} from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";

interface User {
  name: string;
  username: string;
  email: string;
  profilePicture: string;
  posts: {
    id: string;
    title: string;
    image: string;
  }[];
  followers: number;
  following: number;
}

const UserProfile: React.FC = () => {
  // Static dummy user data with posts and social stats
  const dummyUser: User = {
    name: "John Doe",
    username: "johndoe123",
    email: "john.doe@example.com",
    profilePicture: "https://i.pravatar.cc/150?img=3",
    posts: [
      {
        id: "1",
        title: "Beach Vacation",
        image: "https://source.unsplash.com/random/300x300/?beach",
      },
      {
        id: "2",
        title: "Mountain Hike",
        image: "https://source.unsplash.com/random/300x300/?mountain",
      },
      {
        id: "3",
        title: "City View",
        image: "https://source.unsplash.com/random/300x300/?city",
      },
    ],
    followers: 1243,
    following: 567,
  };

  const [user, setUser] = useState<User>(dummyUser);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(dummyUser);

  const handleEdit = () => {
    setEditedUser(user);
    setEditMode(true);
  };

  const handleSave = () => {
    setUser(editedUser);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  // Format large numbers with comma separators
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

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
              src={user.profilePicture}
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
                    label="Name"
                    name="name"
                    value={editedUser.name}
                    onChange={handleChange}
                    margin="normal"
                  />
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
                    label="Email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleChange}
                    margin="normal"
                    type="email"
                  />
                </>
              ) : (
                <>
                  <Typography variant="h4" gutterBottom>
                    {user.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    gutterBottom
                  >
                    @{user.username}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {user.email}
                  </Typography>

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
                        {formatNumber(user.posts.length)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Posts
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="h6">
                        {formatNumber(user.followers)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Followers
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="h6">
                        {formatNumber(user.following)}
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

          {/* Posts Grid - Only shown in view mode */}
          {!editMode && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom>
                Posts
              </Typography>
              <ImageList cols={3} gap={8}>
                {user.posts.map((post) => (
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
                  </ImageListItem>
                ))}
              </ImageList>
            </>
          )}

          <Divider sx={{ my: 3 }} />

          <Box sx={{ textAlign: "right" }}>
            {editMode ? (
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
            ) : (
              <></>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfile;
