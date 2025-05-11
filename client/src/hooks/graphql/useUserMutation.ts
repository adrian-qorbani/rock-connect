import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../apollo/mutatiuons/authMutations";
import { CreateUserInput, UpdateUserInput, User } from "../../types/graphql.types";
import { useAuth } from "../../context/AuthContext";
import { UPDATE_USER } from "../../apollo/mutatiuons/userMutation";

export const useCreateUser = () => {
  const { login } = useAuth();
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
  const [mutate, { loading, error }] = useMutation<{ 
    updateUser: User 
  }, { 
    updateUserInput: UpdateUserInput 
  }>(UPDATE_USER);

  const updateUser = async (input: UpdateUserInput) => {
    try {
      const { data } = await mutate({ 
        variables: { updateUserInput: input } 
      });
      return data?.updateUser;
    } catch (err) {
      console.error('Update user error:', err);
      throw err instanceof Error ? err : new Error('Update failed');
    }
  };

  return { updateUser, loading, error };
};