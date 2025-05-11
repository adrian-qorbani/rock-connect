// src/components/feed/Feed.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useFeedPosts } from "../../hooks/graphql/usePostQueries";
// import { formatDate } from "../../utils/helpers";

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
          No posts available. Follow some users to see their posts!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Feed
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id} hover>
                <TableCell>
                  <Link
                    to={`/posts/${post.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography fontWeight="medium">{post.title}</Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    to={`/users/${post.userId}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography color="primary">
                      @{post.user.username}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {/* {formatDate(post.createdAt)} */}
                    {post.createdAt}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Feed;
