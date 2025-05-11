// src/hooks/graphql/useUserQueries.ts
import { useQuery } from "@apollo/client";
import { GET_CURRENT_USER } from "../../apollo/queries/userQueries";
import { User } from "../../types/graphql.types";

export const useCurrentUser = () => {
  const { data, loading, error, refetch } = useQuery<{ getCurrentUser: User }>(
    GET_CURRENT_USER,
    {
      fetchPolicy: "cache-and-network",
      context: { credentials: "include" },
    }
  );

  return {
    user: data?.getCurrentUser,
    loading,
    error,
    refetch,
  };
};
