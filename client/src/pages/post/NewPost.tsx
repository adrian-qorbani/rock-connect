import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useCreatePost } from "../../hooks/graphql/usePostMutations";

const NewPost: React.FC = () => {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { createPost, loading } = useCreatePost();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!postData.title.trim() || !postData.content.trim()) {
      setError("Title and content are required");
      return;
    }

    try {
      const createdPost = await createPost({
        title: postData.title,
        content: postData.content,
      });

      if (createdPost) {
        navigate(`/feed`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create post");
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create New Post
      </Typography>

      <Paper elevation={3} sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <TextField
            fullWidth
            label="Title"
            name="title"
            value={postData.title}
            onChange={handleChange}
            margin="normal"
            required
            inputProps={{ maxLength: 100 }}
          />

          <TextField
            fullWidth
            label="Content"
            name="content"
            value={postData.content}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={6}
            required
            inputProps={{ maxLength: 5000 }}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? "Creating..." : "Create Post"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default NewPost;
