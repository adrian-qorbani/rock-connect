import { gql } from "@apollo/client";

export const CREATE_COMMENT = gql`
  mutation AddComment($createCommentInput: CreateCommentInput!) {
    createComment(createCommentInput: $createCommentInput) {
      id
      uuid
      content
      createdAt
      userId
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($deleteCommentInput: DeleteCommentInput!) {
    deleteComment(deleteCommentInput: $deleteCommentInput) {
      id
      uuid
    }
  }
`;
