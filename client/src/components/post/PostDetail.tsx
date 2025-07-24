import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSinglePost } from "../../hooks/graphql/usePostQueries";
import { useToggleLike } from "../../hooks/graphql/useLikeMutations";
import { useComments } from "../../hooks/graphql/useCommentsQueries";
import { useCreateComment } from "../../hooks/graphql/useCommentMutations";
import { 
  CircularProgress, 
  Alert, 
  Typography,
  IconButton,
  Box,
  Stack,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  TextField,
  Button
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { formatDate } from "../../utils/formatDate";

const PostDetail: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const { post, loading, error, refetch: refetchPost } = useSinglePost(uuid || "");
  const { toggleLike } = useToggleLike();
  const { comments, loading: commentsLoading, refetch: refetchComments } = useComments(uuid || "");
  const { createComment, loading: createCommentLoading } = useCreateComment();
  
  const [isLiked, setIsLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [commentError, setCommentError] = useState("");

  React.useEffect(() => {
    if (post) {
      setIsLiked(post.likes?.some(like => like.userId === post.userId) || false);
    }
  }, [post]);

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!uuid) return;

    try {
      setLikeLoading(true);
      await toggleLike(uuid);
      setIsLiked(prev => !prev);
      await refetchPost();
    } catch (error) {
      console.error("Failed to toggle like:", error);
      setIsLiked(prev => !prev);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uuid) return;
    if (!commentContent.trim()) {
      setCommentError("Comment cannot be empty");
      return;
    }

    try {
      await createComment(commentContent, uuid);
      setCommentContent("");
      setCommentError("");
      refetchComments(); 
      refetchPost(); 
    } catch (error) {
      console.error("Failed to create comment:", error);
      setCommentError("Failed to post comment");
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error.message}</Alert>;
  if (!post) return <Typography>Post not found</Typography>;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <Avatar src={post.user.profilePicture} alt={post.user.username} />
        <Typography variant="h6">{post.user.username}</Typography>
        <Typography variant="body2" color="text.secondary">
          {formatDate(post.createdAt)}
        </Typography>
      </Stack>

      <Typography variant="h4" gutterBottom>
        {post.title}
      </Typography>

      <Typography variant="body1" paragraph>
        {post.content}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
        <IconButton
          onClick={handleLikeToggle}
          disabled={likeLoading}
          color={isLiked ? "error" : "default"}
        >
          {isLiked ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        <Typography variant="body2" sx={{ ml: 1 }}>
          {post.likesCount} likes
        </Typography>

        <Typography variant="body2" sx={{ ml: 3 }}>
          {post.commentsCount} comments
        </Typography>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Comments
        </Typography>
        
        <Box component="form" onSubmit={handleCommentSubmit} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="Write a comment..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            error={!!commentError}
            helperText={commentError}
            disabled={createCommentLoading}
          />
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              disabled={!commentContent.trim() || createCommentLoading}
            >
              {createCommentLoading ? <CircularProgress size={24} /> : "Post Comment"}
            </Button>
          </Box>
        </Box>

        {commentsLoading ? (
          <CircularProgress size={24} />
        ) : comments.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No comments yet
          </Typography>
        ) : (
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {comments.map((comment) => (
              <React.Fragment key={comment.uuid}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar 
                      src={comment.user.profilePicture} 
                      alt={comment.user.username} 
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={comment.user.username}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {comment.content}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="caption"
                          color="text.secondary"
                        >
                          {formatDate(comment.createdAt)}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default PostDetail;