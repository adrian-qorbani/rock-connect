import React from "react";
import { User } from "../../types/types";

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const handleLogin = () => {
    // Simulate a user login
    const user: User = { id: "1", name: "John Doe" };
    onLogin(user);
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
};

export default Login;