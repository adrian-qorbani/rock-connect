import React from "react";
import { Link } from "react-router-dom";
import { User } from "../../types/types";

interface NavbarProps {
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/feed">Feed</Link>
        <Link to="/connections">Friends</Link>
        <Link to="/profile">User Profile</Link>
      </div>
      {user ? (
        <div>Welcome, {user.name}.</div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default Navbar;