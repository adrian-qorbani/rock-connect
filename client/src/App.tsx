// src/App.tsx
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { User, Post } from "./types/types";
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

const App: React.FC = () => {
  const [posts] = useState<Post[]>([
    {
      id: "1",
      title: "First Post",
      author: "John Doe",
      publishedAt: "2023-10-01",
      content: "This is the content of the first post.",
    },
    {
      id: "2",
      title: "Second Post",
      author: "Jane Smith",
      publishedAt: "2023-10-02",
      content: "This is the content of the second post.",
    },
  ]);
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => {
    setUser(user);
  };

  // Example users for UserRoute
  const currentUsers: User[] = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
  ];

  return (
    <>
      <CssBaseline />
      <Router>
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
                  <Route path="/feed" element={<Feed posts={posts} />} />
                  <Route path="/posts/:id" element={<PostDetail />} />
                  <Route
                    path="/users/:username"
                    element={<UserRoute users={currentUsers} />}
                  />
                  <Route path="/users" element={<UserConnections />} />
                  <Route
                    path="/profile"
                    element={
                      user ? <UserProfile /> : <Navigate replace to="/login" />
                    }
                  />
                  <Route path="/login" element={<Login onLogin={login} />} />
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
