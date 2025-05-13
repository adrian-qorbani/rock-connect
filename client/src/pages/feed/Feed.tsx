// src/components/feed/Feed.tsx
import React, { useState } from "react";
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
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  Share,
  BookmarkBorder,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useFeedPosts } from "../../hooks/graphql/usePostQueries";
import { useToggleLike } from "../../hooks/graphql/useLikeMutations";
import { formatDate } from "../../utils/formatDate";

const Feed: React.FC = () => {
  const { posts, loading, error, refetch } = useFeedPosts();
  const { toggleLike } = useToggleLike();
  const [localLikes, setLocalLikes] = useState<Record<string, boolean>>({});
  const [likeLoading, setLikeLoading] = useState<Record<string, boolean>>({});

  const handleLikeToggle = async (
    postUuid: string,
    isCurrentlyLiked: boolean
  ) => {
    try {
      setLikeLoading((prev) => ({ ...prev, [postUuid]: true }));
      await toggleLike(postUuid);

      setLocalLikes((prev) => ({
        ...prev,
        [postUuid]: !isCurrentlyLiked,
      }));

      await refetch();
    } catch (error) {
      console.error("Failed to toggle like:", error);
    } finally {
      setLikeLoading((prev) => ({ ...prev, [postUuid]: false }));
    }
  };

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
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: "bold" }}>
        Your Feed
      </Typography>

      <Stack spacing={2}>
        {posts.map((post) => {
          const isLiked =
            localLikes[post.uuid] ?? (post.likes && post.likes.length > 0);
          const likeCount =
            post.likesCount || (post.likes ? post.likes.length : 0);

          return (
            <Paper key={post.uuid} elevation={2} sx={{ borderRadius: 2 }}>
              <Box sx={{ display: "flex" }}>
                {/* Like button */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 1.5,
                    bgcolor: "grey.100",
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                  }}
                >
                  <IconButton
                    size="small"
                    color={isLiked ? "error" : "default"}
                    disabled={likeLoading[post.uuid]}
                    onClick={() => handleLikeToggle(post.uuid, isLiked)}
                  >
                    {isLiked ? <Favorite /> : <FavoriteBorder />}
                  </IconButton>
                  <Typography variant="subtitle2" sx={{ my: 0.5 }}>
                    {likeCount}
                  </Typography>
                </Box>

                {/* Post content */}
                <Box sx={{ p: 2, flexGrow: 1 }}>
                  {/* Post header */}
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
                        <strong>u/{post.user.username}</strong>
                      </Link>{" "}
                      • {formatDate(post.createdAt)}
                    </Typography>
                  </Box>

                  {/* Post title and content */}
                  <Link
                    to={`/posts/${post.uuid}`}
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

                  {/* Post actions */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Button
                      startIcon={<ChatBubbleOutline />}
                      size="small"
                      sx={{ mr: 1 }}
                      component={Link}
                      to={`/posts/${post.uuid}`}
                    >
                      {post.commentsCount || 0} Comments
                    </Button>
                    <Button startIcon={<Share />} size="small" sx={{ mr: 1 }}>
                      Share
                    </Button>
                    <Button startIcon={<BookmarkBorder />} size="small">
                      Save
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Feed;
