import React from "react";
import { User } from "../../types/types";
import { Button, TextField } from "@mui/material";
// import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  // const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate a user login
    const user: User = { id: "1", name: "John Doe" };
    onLogin(user);
    // navigate("/");
  };

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField label="username" />
        </div>
        <div>
          <TextField label="password" type="password" />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
