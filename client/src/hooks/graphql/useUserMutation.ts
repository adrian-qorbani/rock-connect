import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../apollo/mutatiuons/authMutations";
import { CreateUserInput, User } from "../../types/graphql.types";
import { useAuth } from "../../context/AuthContext";

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
