import { gql } from "@apollo/client";

export const TOGGLE_POST_LIKE = gql`
  mutation TogglePostLike($getToggleLikePostInput: GetToggleLikePostInput!) {
    togglePostLike(getToggleLikePostInput: $getToggleLikePostInput) {
      createdAt
    }
  }
`;
