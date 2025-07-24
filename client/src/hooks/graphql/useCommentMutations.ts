import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../../apollo/mutatiuons/commentMutation";
import { Comment } from "../../types/graphql.types";

export const useCreateComment = () => {
  const [mutate, { loading, error }] = useMutation<{
    createComment: Comment;
  }>(CREATE_COMMENT);

  const createComment = async (content: string, postUuid: string) => {
    const response = await mutate({
      variables: {
        createCommentInput: {
          content,
          postUuid,
        },
      },
    });

    return response.data?.createComment;
  };

  return {
    createComment,
    loading,
    error,
  };
};
