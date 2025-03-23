// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { User } from "../../types/types";

interface NavbarProps {
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const padding = {
    padding: "5px",
  };

  return (
    <div>
      <Link style={padding} to="/">
        Home
      </Link>
      <Link style={padding} to="/feed">
        Feed
      </Link>
      <Link style={padding} to="/connections">
        Friends
      </Link>
      <Link style={padding} to="/profile">
        User Profile
      </Link>
      {user ? (
        <em>Welcome, {user.name}.</em>
      ) : (
        <Link style={padding} to="/login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;