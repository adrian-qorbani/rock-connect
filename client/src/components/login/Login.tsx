import React, { useState } from "react";
import { User } from "../../types/types";
import { Button, TextField, Snackbar, Alert, Link } from "@mui/material";
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
    
    // Simulate a user login
    const user: User = { id: "1", name: "John Doe" };
    onLogin(user);
    setOpenSuccess(true); 
    setTimeout(() => navigate("/"), 1500);
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically validate passwords match and send to your API
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    
    // Simulate account creation and login
    const user: User = { id: "1", name: formData.username };
    onLogin(user);
    setOpenSuccess(true);
    setTimeout(() => navigate("/"), 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleClose = () => {
    setOpenSuccess(false);
  };

  const toggleCreateAccount = () => {
    setIsCreatingAccount(!isCreatingAccount);
    setFormData({
      username: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <h2 style={{ textAlign: 'center' }}>{isCreatingAccount ? 'Create Account' : 'Login'}</h2>
      
      {!isCreatingAccount ? (
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <TextField 
              label="Username" 
              fullWidth 
              required 
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <TextField 
              label="Password" 
              type="password" 
              fullWidth 
              required 
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Button 
              variant="contained" 
              color="primary" 
              type="submit"
              fullWidth
              size="large"
            >
              Login
            </Button>
          </div>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Link 
              component="button" 
              type="button" 
              onClick={toggleCreateAccount}
              underline="hover"
            >
              Create a new account
            </Link>
          </div>
        </form>
      ) : (
        <form onSubmit={handleCreateAccount}>
          <div style={{ marginBottom: 16 }}>
            <TextField 
              label="Username" 
              fullWidth 
              required 
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <TextField 
              label="Password" 
              type="password" 
              fullWidth 
              required 
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <TextField 
              label="Confirm Password" 
              type="password" 
              fullWidth 
              required 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Button 
              variant="contained" 
              color="primary" 
              type="submit"
              fullWidth
              size="large"
            >
              Create Account
            </Button>
          </div>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Link 
              component="button" 
              type="button" 
              onClick={toggleCreateAccount}
              underline="hover"
            >
              Back to Login
            </Link>
          </div>
        </form>
      )}

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
    </div>
  );
};

export default Login;