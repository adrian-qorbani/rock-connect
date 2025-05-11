import React from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Stack,
  IconButton,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import {
  ArrowUpward,
  ArrowDownward,
  ChatBubbleOutline,
  Share,
  BookmarkBorder,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useFeedPosts } from "../../hooks/graphql/usePostQueries";
import { formatDate } from "../../utils/formatDate";

const Feed: React.FC = () => {
  const { posts, loading, error } = useFeedPosts();

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, color: "error.main" }}>
        <Typography>Error loading posts: {error.message}</Typography>
      </Box>
    );
  }

  if (posts.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Your Feed
        </Typography>
        <Typography>
          No posts available. Follow some users to see their posts or checkout
          home for lastest posts!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: "bold" }}>
        Your Feed
      </Typography>

      <Stack spacing={2}>
        {posts.map((post) => (
          <Paper key={post.id} elevation={2} sx={{ borderRadius: 2 }}>
            <Box sx={{ display: "flex" }}>
              {/* Vote buttons */}
              <Box
                sx={{
                  bgcolor: "grey.100",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 1,
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}
              >
                <IconButton size="small" color="inherit">
                  <ArrowUpward fontSize="small" />
                </IconButton>
                <Typography variant="subtitle2" sx={{ my: 0.5 }}>
                  {post.likesCount}
                </Typography>
                <IconButton size="small" color="inherit">
                  <ArrowDownward fontSize="small" />
                </IconButton>
              </Box>

              <Box sx={{ p: 2, flexGrow: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Avatar
                    src={post.user.profilePicture || "/default-avatar.png"}
                    sx={{ width: 24, height: 24, mr: 1 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Posted by{" "}
                    <Link
                      to={`/users/${post.userId}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <strong>@{post.user.username}</strong>
                    </Link>{" "}
                    • {formatDate(post.createdAt)} •{" "}
                  </Typography>
                </Box>

                <Link
                  to={`/posts/${post.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {post.content.length > 200
                      ? `${post.content.substring(0, 200)}...`
                      : post.content}
                  </Typography>
                </Link>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button
                    startIcon={<ChatBubbleOutline />}
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    {post.commentsCount} Comments
                  </Button>
                  <Button startIcon={<Share />} size="small" sx={{ mr: 1 }}>
                    Share
                  </Button>
                  <Button startIcon={<BookmarkBorder />} size="small">
                    Save
                  </Button>
                </Box>

                {post.comments.length > 0 && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ pl: 2 }}>
                      {post.comments.slice(0, 2).map((comment) => (
                        <Box key={comment.id} sx={{ mb: 2 }}>
                          <Typography variant="caption" color="text.secondary">
                            <Link
                              to={`/users/${comment.userId}`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <strong>u/{comment.user.username}</strong>
                            </Link>
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {comment.content.length > 100
                              ? `${comment.content.substring(0, 100)}...`
                              : comment.content}
                          </Typography>
                        </Box>
                      ))}
                      {post.comments.length > 2 && (
                        <Typography variant="caption" color="text.secondary">
                          View all {post.commentsCount} comments
                        </Typography>
                      )}
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default Feed;
