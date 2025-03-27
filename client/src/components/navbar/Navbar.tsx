import React from "react";
import { Link } from "react-router-dom";
import { User } from "../../types/types";
import { AppBar, Button, Toolbar, Typography, Box } from "@mui/material";

interface NavbarProps {
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/feed">
          Feed
        </Button>
        
        {/* User-specific links */}
        {user && (
          <>
            {/* <Button color="inherit" component={Link} to="/connections">
              Friends
            </Button> */}
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
          </>
        )}

        {/* Spacer to push login/user info to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {user ? (
          <Typography variant="body1" component="span" sx={{ color: 'inherit' }}>
            Welcome, {user.name}
          </Typography>
        ) : (
          <Button 
            color="inherit" 
            component={Link} 
            to="/login"
            sx={{ 
              marginLeft: 'auto',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)'
              }
            }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;