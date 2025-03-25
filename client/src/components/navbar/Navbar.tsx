import React from "react";
import { Link } from "react-router-dom";
import { User } from "../../types/types";
import { AppBar, Button, IconButton, Toolbar } from "@mui/material";

interface NavbarProps {
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Button color="inherit" component={Link} to="/">
          home
        </Button>
        <Button color="inherit" component={Link} to="/feed">
          feed
        </Button>
        <Button color="inherit" component={Link} to="/connections">
          friends
        </Button>
        <Button color="inherit" component={Link} to="/profile">
          user profile
        </Button>
        {user ? (
          <em>{user.name} logged in</em>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
