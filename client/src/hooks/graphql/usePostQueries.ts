import { useQuery } from "@apollo/client";
import { GET_FEED_POSTS } from "../../apollo/queries/postQuery";
import { FeedPost as Post } from "../../types/graphql.types";

export const useFeedPosts = () => {
  const { data, loading, error, refetch } = useQuery<{
    getCurrentUserFeedPosts: Post[];
  }>(GET_FEED_POSTS, {
    fetchPolicy: "cache-and-network",
    context: { credentials: "include" },
  });

  return {
    posts: data?.getCurrentUserFeedPosts || [],
    loading,
    error,
    refetch,
  };
};
