import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "../../apollo/mutatiuons/authMutations";
import { AuthInput, AuthResponse } from "../../types/graphql.types";
import { useAuth } from "../../context/AuthContext";

export const useLogin = () => {
  const { login } = useAuth();
  const [mutate, { loading, error }] = useMutation<
    { login: AuthResponse },
    { authInput: AuthInput }
  >(LOGIN_MUTATION);

  const loginUser = async (input: AuthInput) => {
    try {
      const { data } = await mutate({ variables: { authInput: input } });
      if (data?.login.access_token) {
        login(data.login.access_token, { username: input.username });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Login error:", err);
      throw err instanceof Error ? err : new Error("Login failed");
    }
  };

  return { login: loginUser, loading, error };
};
