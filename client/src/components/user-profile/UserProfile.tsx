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
  Typography 
} from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";

interface User {
  name: string;
  username: string;
  email: string;
  profilePicture: string;
}

const UserProfile: React.FC = () => {
  // Static dummy user data
  const dummyUser: User = {
    name: "John Doe",
    username: "johndoe123",
    email: "john.doe@example.com",
    profilePicture: "https://i.pravatar.cc/150?img=3" // Random avatar
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
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Card>
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
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            alignItems: 'center',
            gap: 4,
            mb: 4
          }}>
            <Avatar
              src={user.profilePicture}
              sx={{ 
                width: 150, 
                height: 150,
                border: '2px solid',
                borderColor: 'primary.main'
              }}
            />
            
            <Box sx={{ flex: 1, width: '100%' }}>
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
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    @{user.username}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {user.email}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          <Box sx={{ textAlign: 'right' }}>
            {editMode ? (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
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
              <Button
                variant="contained"
                color="primary"
                startIcon={<Edit />}
                onClick={handleEdit}
              >
                Edit Profile
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserProfile;