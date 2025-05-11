import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      uuid
      username
      bio
      profilePicture
      postsCount
      followersCount
      followingCount
      posts {
        id
        uuid
        title
        content
        createdAt
      }
    }
  }
`;