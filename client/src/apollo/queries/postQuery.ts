import { gql } from "@apollo/client";

export const GET_FEED_POSTS = gql`
  query GetCurrentUserFeedPosts {
    getCurrentUserFeedPosts {
      id
      title
      content
      createdAt
      userId
      user {
        username
      }
    }
  }
`;
