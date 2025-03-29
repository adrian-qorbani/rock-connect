// src/apollo/client.ts
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import Cookies from "js-cookie";

const graphUrl = import.meta.env.SERVER_GRAPHQL_ENDPOINT;

const httpLink = new HttpLink({
  uri: graphUrl || "http://localhost:3000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("access_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      if (message === "Unauthorized" || message.includes("Forbidden")) {
        // Handle token expiration or invalid token
        Cookies.remove("access_token");
        // You might want to redirect to login here
        window.location.href = "/login";
      }
    });
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
});

export default client;