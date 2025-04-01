/*
 * React App
 *
 * Set up Apollo Client to handle authentication middleware.
 *
 * The middleware checks for the JWT (JSON Web Token) in the client's localStorage
 * and attaches it to the request headers.
 *
 */
import "./App.css";
import { Outlet } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Navbar from "./components/Navbar";

// Define the GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

/*
 * The 'authLink' middleware tries to read the JWT token from localStorage.
 * If the token exists, it adds it to the request headers as an 'authorization' header.
 * Othwerwise, no 'authorization' header is added to the request.
 */
const authLink = setContext((_, { headers }) => {
  // Try to  read the authentication token from localStorage
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

/*
 * The Apollo Client combines the 'authLink' middleware (for attaching the token)
 * with the 'httpLink' (for sending the request to the GraphQL API).
 */
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
