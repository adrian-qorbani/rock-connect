import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../apollo/queries/userQueries';
import { User } from '../types/graphql.types';

interface AuthContextType {
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
  loading: boolean;
  token: string | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const client = useApolloClient();

  const { loading: queryLoading, data } = useQuery<{ getCurrentUser: User }>(
    GET_CURRENT_USER,
    {
      fetchPolicy: 'network-only',
      skip: !Cookies.get('access_token'),
      onCompleted: (data) => {
        setUser(data.getCurrentUser);
        setInitialLoading(false);
      },
      onError: () => {
        Cookies.remove('access_token');
        setInitialLoading(false);
      },
    }
  );

  useEffect(() => {
    const savedToken = Cookies.get('access_token');
    if (savedToken) {
      setToken(savedToken);
    } else {
      setInitialLoading(false);
    }
  }, []);

  const login = (token: string, user: User) => {
    Cookies.set('access_token', token, {
      expires: 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    setToken(token);
    setUser(user);
  };

  const logout = async () => {
    Cookies.remove('access_token');
    setUser(null);
    setToken(null);
    await client.clearStore();
  };

  const value = {
    user,
    login,
    logout,
    loading: initialLoading || queryLoading,
    token,
    isAuthenticated: !!user && !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}