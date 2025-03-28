import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
const graphUrl = process.env.SERVER_GRAPHQL_ENDPOINT;

const httpLink = new HttpLink({
  uri: graphUrl || "http://localhost:3000/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
