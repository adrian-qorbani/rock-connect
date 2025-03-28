import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($authInput: AuthInput!) {
    login(authInput: $authInput) {
      access_token
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      uuid
    }
  }
`;