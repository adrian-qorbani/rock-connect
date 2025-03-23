// src/components/UserRoute.tsx
import React from "react";
import { User } from "../../types/types";
import styles from "../../styles/App.module.css"
interface UserRouteProps {
  users: User[];
}

const UserRoute: React.FC<UserRouteProps> = ({ users }) => (
  <div className={styles.main}>
    <h2>Users</h2>
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  </div>
);

export default UserRoute;