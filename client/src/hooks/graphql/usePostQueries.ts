import { useQuery } from "@apollo/client";
import { GET_FEED_POSTS } from "../../apollo/queries/postQuery";
import { FeedPost as Post } from "../../types/graphql.types";
import { useMemo } from "react";

export const useFeedPosts = () => {
  const { data, loading, error, refetch } = useQuery<{
    getCurrentUserFeedPosts: Post[];
  }>(GET_FEED_POSTS, {
    fetchPolicy: "cache-and-network",
  });

  // Transform data to include like status
  const posts = useMemo(() => {
    return (
      data?.getCurrentUserFeedPosts.map((post) => ({
        ...post,
        isLikedByCurrentUser:
          post.likes?.some((like) => like.userId === post.userId) || false,
      })) || []
    );
  }, [data]);

  return { posts, loading, error, refetch };
};
