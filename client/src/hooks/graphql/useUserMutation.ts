import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../apollo/mutatiuons/authMutations";
import {
  CreateUserInput,
  EditUserInput,
  User,
} from "../../types/graphql.types";
import { UPDATE_USER } from "../../apollo/mutatiuons/userMutation";
import { useLogin } from "./useAuthMutations";

export const useCreateUser = () => {
  const { login: loginUser } = useLogin();
  const [mutate, { loading, error }] = useMutation<
    {
      createUser: User;
    },
    {
      createUserInput: CreateUserInput;
    }
  >(CREATE_USER);

  const createUser = async (input: CreateUserInput) => {
    try {
      const { data } = await mutate({
        variables: { createUserInput: input },
      });

      if (data?.createUser) {
        const loginSuccess = await loginUser({
          username: input.username,
          password: input.password,
        });

        if (!loginSuccess) {
          throw new Error("Automatic login after registration failed");
        }

        return data.createUser;
      }
      throw new Error("User creation failed");
    } catch (err) {
      console.error("Registration error:", err);
      throw err instanceof Error ? err : new Error("Registration failed");
    }
  };

  return { createUser, loading, error };
};

export const useUpdateUser = () => {
  const [mutate, { loading, error }] = useMutation<
    {
      updateUser: User;
    },
    {
      editUserInput: EditUserInput;
    }
  >(UPDATE_USER);

  const updateUser = async (input: EditUserInput) => {
    try {
      const { data } = await mutate({
        variables: { editUserInput: input },
      });
      return data?.updateUser;
    } catch (err) {
      console.error("Update user error:", err);
      throw err instanceof Error ? err : new Error("Update failed");
    }
  };

  return { updateUser, loading, error };
};
