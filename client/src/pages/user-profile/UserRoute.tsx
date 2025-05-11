// src/components/UserRoute.tsx
import React from "react";
import { User } from "../../types/general.types";
interface UserRouteProps {
  users: User[];
}

const UserRoute: React.FC<UserRouteProps> = ({ users }) => (
  <div>
    <h2>Users</h2>
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  </div>
);

export default UserRoute;