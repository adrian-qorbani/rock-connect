import { gql } from "@apollo/client";

export const GET_COMMENTS = gql`
  query GetComments($getCommentInput: GetCommentsByInput!) {
    getComments(getCommentInput: $getCommentInput) {
      id
      uuid
      content
      createdAt
      updatedAt
      userId
      postId
      user {
        id
        username
        profilePicture
      }
    }
  }
`;