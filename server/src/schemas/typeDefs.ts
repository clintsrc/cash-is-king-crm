/*
 * GraphQL API structure
 *
 * Defines the structure of the GraphQL API using Schema Definition Language (SDL).
 * Specifies data types, queries, and mutations for interacting with the backend.
 *
 */

const typeDefs = `
  ##############  types
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  ##############  Queries
  type Query {
    user(username: String!): User
    me: User
  }

  ##############  Mutations
  type Mutation {
    # Add a new user (signup)
    addUser(input: UserInput!): Auth

    # Login user and return JWT token (signin)
    loginUser(email: String!, password: String!): Auth
  }
`;

export default typeDefs;
