import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "../../apollo/queries/commentQuery";
import { Comment } from "../../types/graphql.types";

export const useComments = (postUuid: string) => {
  const { data, loading, error, refetch } = useQuery<{
    getComments: Comment[];
  }>(GET_COMMENTS, {
    variables: {
      getCommentInput: {
        postUuid: postUuid,
      },
    },
    fetchPolicy: "cache-and-network",
    skip: !postUuid,
  });

  return {
    comments: data?.getComments || [],
    loading,
    error,
    refetch,
  };
};
