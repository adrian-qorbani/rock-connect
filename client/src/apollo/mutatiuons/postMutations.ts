import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
      uuid
      createdAt
      updatedAt
      title
      content
      userId
    }
  }
`;