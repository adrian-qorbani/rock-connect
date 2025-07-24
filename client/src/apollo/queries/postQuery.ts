import { gql } from "@apollo/client";

export const GET_SINGLE_POST = gql`
  query GetSinglePost($singlePostInput: GetSinglePostInput!) {
    getSinglePost(singlePostInput: $singlePostInput) {
      id
      uuid
      title
      content
      createdAt
      updatedAt
      userId
      likesCount
      commentsCount
      user {
        id
        username
        profilePicture
      }
      likes {
        id
        user {
          id
          username
        }
      }
      comments {
        id
        content
        userId
        user {
          id
          username
        }
      }
    }
  }
`;

export const GET_FEED_POSTS = gql`
  query GetCurrentUserFeedPosts {
    getCurrentUserFeedPosts {
      id
      uuid
      title
      content
      createdAt
      updatedAt
      userId
      likesCount
      commentsCount
      user {
        id
        username
        profilePicture
      }
      likes {
        id
        user {
          id
          username
        }
      }
      comments {
        id
        content
        userId
        user {
          id
          username
        }
      }
    }
  }
`;
