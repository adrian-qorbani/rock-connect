// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { User } from "./types/types";
import Home from "./components/home/Home";
import Feed from "./components/feed/Feed";
import UserConnections from "./components/user-connections/UserConnections";
import UserProfile from "./components/user-profile/UserProfile";
import PostDetail from "./components/post/PostDetail";
import Login from "./components/login/Login";
import UserRoute from "./components/user-profile/UserRoute";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { Box, Container, CssBaseline } from "@mui/material";
import { useAuth } from "./context/AuthContext";
import LoadingScreen from "./components/common/LoadingScreen";

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    if (loading) {
      return <LoadingScreen />;
    }
  }

  const isPublicPage = ["/login", "/"].includes(location.pathname);
  if (!user && !isPublicPage) {
    return <Navigate to="/login" replace />;
  }

  const MOCK_USERS: User[] = [
    { id: "1", username: "John Doe" },
    { id: "2", username: "Jane Smith" },
  ];

  return (
    <>
      <CssBaseline />
      <Router>
        {/* @ts-ignore */}
        <Navbar user={user} />
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 0,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {" "}
            <div>
              <main>
                <Routes>
                  <Route path="/feed" element={<Feed />} />
                  <Route path="/posts/:id" element={<PostDetail />} />
                  <Route
                    path="/users/:username"
                    element={<UserRoute users={MOCK_USERS} />}
                  />
                  <Route path="/users" element={<UserConnections />} />
                  <Route
                    path="/profile"
                    element={
                      user ? <UserProfile /> : <Navigate replace to="/login" />
                    }
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<Home />} />
                </Routes>
              </main>
            </div>
            <Footer />
          </Box>
        </Container>
      </Router>
    </>
  );
};

export default App;
