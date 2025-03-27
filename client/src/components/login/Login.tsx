import React, { useState } from "react";
import { User } from "../../types/types";
import { Button, TextField, Snackbar, Alert, Link, Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user: User = { id: "1", name: "John Doe" };
    onLogin(user);
    setOpenSuccess(true); 
    setTimeout(() => navigate("/"), 1500);
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    const user: User = { id: "1", name: formData.username };
    onLogin(user);
    setOpenSuccess(true);
    setTimeout(() => navigate("/"), 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClose = () => setOpenSuccess(false);
  const toggleCreateAccount = () => {
    setIsCreatingAccount(!isCreatingAccount);
    setFormData({ username: '', password: '', confirmPassword: '' });
  };

  return (
    <Box sx={{
      display: 'flex',
      height: '80vh',
      flexDirection: { xs: 'column', md: 'row' }
    }}>
      {/* Left Section - Welcome Content */}
      <Box sx={{
        flex: 1,
        // background: 'linear-gradient(to bottom, #1e88e5, #0d47a1)',
        // color: 'white',
        p: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: { xs: 'center', md: 'left' }
      }}>
        <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          Rock-Connect
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Connect with friends and artists.
        </Typography>
        <Box>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
            Vivamus hendrerit arcu sed erat molestie vehicula.
          </Typography>
          <Typography>
            Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.
          </Typography>
        </Box>
      </Box>

      {/* Right Section - Form */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4
      }}>
        <Paper elevation={6} sx={{
          width: '100%',
          maxWidth: 400,
          p: 4
        }}>
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            {isCreatingAccount ? 'Create Account' : 'Login'}
          </Typography>
          
          <Box component="form" onSubmit={isCreatingAccount ? handleCreateAccount : handleLogin}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {isCreatingAccount && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isCreatingAccount ? 'Create Account' : 'Login'}
            </Button>
            <Box textAlign="center">
              <Link 
                component="button" 
                type="button" 
                onClick={toggleCreateAccount}
                underline="hover"
              >
                {isCreatingAccount ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {isCreatingAccount ? 'Account created successfully!' : 'Login successful!'} Redirecting...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;