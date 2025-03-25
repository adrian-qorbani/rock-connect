import React, { useState } from "react";
import { User } from "../../types/types";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate a user login
    const user: User = { id: "1", name: "John Doe" };
    onLogin(user);
    setOpenSuccess(true); 
    setTimeout(() => navigate("/"), 1500);
  };

  const handleClose = () => {
    setOpenSuccess(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 16 }}>
          <TextField 
            label="Username" 
            fullWidth 
            required 
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <TextField 
            label="Password" 
            type="password" 
            fullWidth 
            required 
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
      </form>

      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Login successful! Redirecting...
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;