import { useQuery } from "@apollo/client";
import {
  GET_FEED_POSTS,
  GET_SINGLE_POST,
} from "../../apollo/queries/postQuery";
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

export const useSinglePost = (postUuid: string) => {
  if (!postUuid) {
    console.error("useSinglePost - Empty postUuid received!");
    throw new Error("Post UUID is required");
  }

  console.log("useSinglePost - Creating query with postUuid:", postUuid);

  const { data, loading, error, refetch } = useQuery<{
    getSinglePost: Post;
  }>(GET_SINGLE_POST, {
    variables: {
      singlePostInput: {
        postUuid: postUuid,
      },
    },
    fetchPolicy: "cache-and-network",
    skip: !postUuid,
  });

  const post = useMemo(() => {
    if (!data?.getSinglePost) return null;

    return {
      ...data.getSinglePost,
      isLikedByCurrentUser:
        data.getSinglePost.likes?.some(
          (like) => like.userId === data.getSinglePost.userId
        ) || false,
    };
  }, [data]);

  return { post, loading, error, refetch };
};
