import React from "react";
import { Link } from "react-router-dom";
import { User } from "../../types/types";
import styles from "../../styles/Navbar.module.css";

interface NavbarProps {
  user: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <div className={styles.navbar}>
      <div>
        <Link to="/">Home</Link>
        <Link to="/feed">Feed</Link>
        <Link to="/connections">Friends</Link>
        <Link to="/profile">User Profile</Link>
      </div>
      {user ? (
        <div className={styles.welcome}>Welcome, {user.name}.</div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default Navbar;