// src/pages/post/PostDetail.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSinglePost } from "../../hooks/graphql/usePostQueries";
import { useToggleLike } from "../../hooks/graphql/useLikeMutations";
import { 
  CircularProgress, 
  Alert, 
  Typography,
  IconButton,
  Box,
  Stack,
  Avatar
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { formatDate } from "../../utils/formatDate";

const PostDetail: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const { post, loading, error, refetch } = useSinglePost(uuid || "");
  const { toggleLike } = useToggleLike();
  
  const [isLiked, setIsLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

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
      
      await refetch();
    } catch (error) {
      console.error("Failed to toggle like:", error);
      setIsLiked(prev => !prev);
    } finally {
      setLikeLoading(false);
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

      {/* comments section */}
    </Box>
  );
};

export default PostDetail;