// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Feed from "./pages/feed/Feed";
import UserProfile from "./pages/user-profile/UserProfile";
import Navbar from "./components/layout/navbar/Navbar";
import { Box, CssBaseline } from "@mui/material";
import NewPost from "./pages/post/NewPost";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}

function Layout() {
  const { user } = useAuth();

  return (
    <>
      <CssBaseline />
      <Navbar user={user} />
      <Box component="main" sx={{ p: 3 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-post"
            element={
              <ProtectedRoute>
                <NewPost />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>
    </>
  );
}

export default App;
