import React, { useState } from "react";
import {
  Button,
  TextField,
  Snackbar,
  Alert,
  Link,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  useCreateUserMutation,
} from "../../generated/graphql";
import Cookies from "js-cookie";

interface LoginProps {
  onLogin: (user: { username: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [login, { loading: loginLoading }] = useLoginMutation({
    onCompleted: (data) => {
      Cookies.set("access_token", data.login.access_token, { expires: 1 });
      onLogin({ username: formData.username });
      setOpenSuccess(true);
      setTimeout(() => navigate("/"), 1500);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const [createUser, { loading: createUserLoading }] = useCreateUserMutation({
    onCompleted: () => {
      //log in after user creates
      login({
        variables: {
          authInput: {
            username: formData.username,
            password: formData.password,
          },
        },
      });
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    login({
      variables: {
        authInput: {
          username: formData.username,
          password: formData.password,
        },
      },
    });
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords don't match!");
      return;
    }

    createUser({
      variables: {
        createUserInput: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
      },
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setOpenSuccess(false);
    setErrorMessage("");
  };

  const toggleCreateAccount = () => {
    setIsCreatingAccount(!isCreatingAccount);
    setFormData({ username: "", email: "", password: "", confirmPassword: "" });
    setErrorMessage("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "80vh",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Left Section - Welcome Content */}
      <Box
        sx={{
          flex: 1,
          p: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          Rock-Connect
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Connect with friends and artists.
        </Typography>
        <Box>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
            dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
          </Typography>
        </Box>
      </Box>

      {/* Right Section - Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: 400,
            p: 4,
          }}
        >
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            {isCreatingAccount ? "Create Account" : "Login"}
          </Typography>

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={isCreatingAccount ? handleCreateAccount : handleLogin}
          >
            {isCreatingAccount && (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {isCreatingAccount && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                loginLoading ||
                createUserLoading ||
                !formData.username ||
                !formData.password ||
                (isCreatingAccount &&
                  (!formData.email ||
                    formData.password !== formData.confirmPassword))
              }
            >
              {isCreatingAccount
                ? createUserLoading
                  ? "Creating..."
                  : "Create Account"
                : loginLoading
                ? "Logging in..."
                : "Login"}
            </Button>
            <Box textAlign="center">
              <Link
                component="button"
                type="button"
                onClick={toggleCreateAccount}
                underline="hover"
              >
                {isCreatingAccount
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign Up"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {isCreatingAccount
            ? "Account created successfully!"
            : "Login successful!"}{" "}
          Redirecting...
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
