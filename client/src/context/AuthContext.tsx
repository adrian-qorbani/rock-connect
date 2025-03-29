import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useApolloClient, useQuery } from "@apollo/client";
import { GetCurrentUserDocument } from "../generated/graphql";

interface AuthContextType {
  user: { username: string } | null;
  login: (user: { username: string }) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const client = useApolloClient();

  const { data, error } = useQuery(GetCurrentUserDocument, {
    skip: !Cookies.get("access_token"),
  });

  useEffect(() => {
    if (data?.currentUser) {
      setUser(data.currentUser);
    } else if (error) {
      Cookies.remove("access_token");
    }
    setLoading(false);
  }, [data, error]);

  const login = (user: { username: string }) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("access_token");
    client.resetStore();
  };

  const value = { user, login, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
