import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
      id
      uuid
      createdAt
      updatedAt
      title
      content
      userId
    }
  }
`;