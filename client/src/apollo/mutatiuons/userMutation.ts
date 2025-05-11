import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation EditUser($editUserInput: EditUserInput!) {
    editUser(editUserInput: $editUserInput) {
      id
      username
      bio
      profilePicture
    }
  }
`;
