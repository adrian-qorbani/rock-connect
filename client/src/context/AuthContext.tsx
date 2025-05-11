import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useApolloClient } from "@apollo/client";
import { GetCurrentUserDocument } from "../generated/graphql";
import { User } from "../types/graphql.types";

interface AuthContextType {
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  loading: boolean;
  token: string | null;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const client = useApolloClient();

  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = Cookies.get("access_token");
      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await client.query({
          query: GetCurrentUserDocument,
          fetchPolicy: "network-only",
        });
        if (data?.currentUser) {
          setUser(data.currentUser);
          setToken(savedToken);
        }
      } catch (error) {
        Cookies.remove("access_token");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [client]);

  const login = (token: string, user: User) => {
    Cookies.set("access_token", token, { expires: 7 });
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    Cookies.remove("access_token");
    client.resetStore();
  };

  const value = { user, login, logout, loading, token };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
