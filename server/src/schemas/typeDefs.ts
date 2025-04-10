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

  enum OrderStatus {
    PENDING
    SCHEDULED
    DENIED
    PAST
  }

  type Address {
    city: String!
    street: String!
    state: String!
    zip: String!
  }

  input AddressInput {
    city: String!
    street: String!
    state: String!
    zip: String!
  }

  scalar Date

  type Order{
    _id: ID
    firstName: String!
    lastName: String!
    fullName: String!
    email: String!
    phoneNumber: String!
    eventName: String!
    description: String!
    atmCount: Int!
    startDate: Date!
    endDate: Date!
    status: OrderStatus!
    address: Address!
    createdAt: Date!
    updatedAt: Date!
  }

  input OrderInput{
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    eventName: String!
    description: String!
    atmCount: Int!
    startDate: Date!
    endDate: Date!
    status: OrderStatus
    address: AddressInput!
  }

  type Auth {
    token: ID!
    user: User
  }

  ##############  Queries
  type Query {
    user(username: String!): User
    me: User

    orders: [Order!]!
    order(id: ID!): Order
  }

  ##############  Mutations
  type Mutation {
    # Add a new user (signup)
    addUser(input: UserInput!): Auth

    # Login user and return JWT token (signin)
    loginUser(email: String!, password: String!): Auth

    # Create an Order
    orderCreate(input: OrderInput!): Order!

    # Delete an Order
    orderDelete(id: ID!): Boolean!

    #Update an Order
    orderUpdate(id: ID!, status: OrderStatus!): Order
  }
`;

export default typeDefs;
