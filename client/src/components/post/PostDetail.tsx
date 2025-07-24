import React from "react";
import { useParams } from "react-router-dom";
import { useSinglePost } from "../../hooks/graphql/usePostQueries";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  Chip,
  CircularProgress,
  Alert,
  Stack,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { formatDate } from "../../utils/formatDate";

const PostDetail: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();

  if (!uuid) {
    return <Alert severity="error">Invalid post path. please try again.</Alert>;
  }

  const { post, loading, error } = useSinglePost(uuid);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        {error.message}
      </Alert>
    );
  }

  if (!post) {
    return (
      <Alert severity="warning" sx={{ my: 2 }}>
        Post not found
      </Alert>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 3, my: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {post.title}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <Avatar src={post.user.profilePicture} alt={post.user.username} />
        <Typography variant="subtitle1">
          Posted by {post.user.username}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {formatDate(new Date(post.createdAt))}
        </Typography>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Typography variant="body1" paragraph>
        {post.content}
      </Typography>

      <Stack direction="row" spacing={1} sx={{ my: 2 }}>
        <Chip label={`${post.likesCount} likes`} color="primary" />
        <Chip label={`${post.commentsCount} comments`} />
      </Stack>

      {post.comments && post.comments.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Comments
          </Typography>
          <List>
            {post.comments.map((comment) => (
              <ListItem key={comment.id} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    src={comment.user.profilePicture}
                    alt={comment.user.username}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.user.username}
                  secondary={comment.content}
                  secondaryTypographyProps={{ color: "text.primary" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Paper>
  );
};

export default PostDetail;
