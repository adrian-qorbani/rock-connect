import React, { useEffect, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/graphql/useAuthMutations";
import { useCreateUser } from "../../hooks/graphql/useUserMutation";
import { validatePassword } from "../../utils/passValidation";
import { useAuth } from "../../context/AuthContext";

interface LoginFormData {
  username: string;
  password: string;
}

interface RegisterFormData extends LoginFormData {
  email: string;
  confirmPassword: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordValidation, setPasswordValidation] = useState({
    isValid: false,
    requirements: [] as { met: boolean; text: string }[],
  });

  const {
    login: loginUser,
    loading: loginLoading,
    error: loginError,
  } = useLogin();
  const {
    createUser,
    loading: registerLoading,
    error: registerError,
  } = useCreateUser();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const success = await loginUser({
        username: formData.username,
        password: formData.password,
      });

      if (success) {
        setOpenSuccess(true);
        const from = location.state?.from?.pathname || "/";
        setTimeout(() => navigate(from, { replace: true }), 1500);
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Login failed");
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords don't match!");
      return;
    }

    try {
      await createUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      setOpenSuccess(true);
      const from = location.state?.from?.pathname || "/";
      setTimeout(() => navigate(from, { replace: true }), 1500);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Registration failed"
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password" && isCreatingAccount) {
      setPasswordValidation(validatePassword(value));
    }
  };

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrorMessage("");
    setPasswordValidation({
      isValid: false,
      requirements: [],
    });
  };

  const toggleCreateAccount = () => {
    setIsCreatingAccount(!isCreatingAccount);
    resetForm();
  };

  // Derived states
  const isLoading = isCreatingAccount ? registerLoading : loginLoading;
  const error = isCreatingAccount ? registerError : loginError;
  const isLoginDisabled = !formData.username || !formData.password || isLoading;
  const isRegisterDisabled =
    !formData.username ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword ||
    formData.password !== formData.confirmPassword ||
    (isCreatingAccount && !passwordValidation.isValid);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "80vh",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        sx={{
          flex: 1,
          p: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: { xs: "center", md: "left" },
          bgcolor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          {isCreatingAccount ? "Join Us" : "Welcome To Rock-Connect"}
        </Typography>
        <Typography variant="h6">
          {isCreatingAccount
            ? "Become part of our community"
            : "Create a network with music industry artists and fans."}
        </Typography>
      </Box>

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
            {isCreatingAccount ? "Create Account" : "Sign In"}
          </Typography>

          {(errorMessage || error) && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
              onClose={() => setErrorMessage("")}
            >
              {errorMessage || error?.message}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={isCreatingAccount ? handleCreateAccount : handleLogin}
            noValidate
          >
            {isCreatingAccount && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={formData.username}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete={
                isCreatingAccount ? "new-password" : "current-password"
              }
              value={formData.password}
              onChange={handleInputChange}
              sx={{ mb: 2 }}
            />

            {isCreatingAccount && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  sx={{ mb: 1 }}
                />
                <Box sx={{ mt: 1, mb: 2 }}>
                  <Typography variant="caption">
                    Password Requirements:
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, mt: 0.5 }}>
                    {passwordValidation.requirements.map((req, i) => (
                      <Box
                        component="li"
                        key={i}
                        sx={{
                          color: req.met ? "success.main" : "text.secondary",
                          fontSize: "0.75rem",
                        }}
                      >
                        {req.text}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={
                isCreatingAccount ? isRegisterDisabled : isLoginDisabled
              }
              sx={{ mt: 1, mb: 2 }}
            >
              {isCreatingAccount
                ? isLoading
                  ? "Creating Account..."
                  : "Create Account"
                : isLoading
                ? "Signing In..."
                : "Sign In"}
            </Button>

            <Box textAlign="center">
              <Link
                component="button"
                type="button"
                onClick={toggleCreateAccount}
                underline="hover"
                color="inherit"
              >
                {isCreatingAccount
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Create Account"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={() => setOpenSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          sx={{ width: "100%" }}
          onClose={() => setOpenSuccess(false)}
        >
          {isCreatingAccount
            ? "Account created successfully! Redirecting..."
            : "Login successful! Redirecting..."}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
