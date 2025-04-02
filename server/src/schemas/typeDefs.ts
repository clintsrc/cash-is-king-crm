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

  type Order {
    _id: ID
    first_name: String
    last_name: String
    phone_number: Number
    email: String
    createdAt: Date
    start_date: Date
    end_date: Date
    atms: Number
    description: String
    status: [Status]!
    address: [Address]!
  }

  input OrderInput {
    first_name: String!
    last_name: String!
    phone_number: Number!
    email: String!
    start_date: Date!
    end_date: Date!
    atms: Number!
    description: String!
    status: [Status]!
    ################## status may need to be updated so that it defaults to pending upon initial creation. need to see if this is handled via resolver - ethan
    address: [Address]!
  }

  type Status {
    pending: String
    scheduled: String
    completed: String
    denied: String
  }

  type Address {
    street: String
    city: String
    state: String
    zip: Number
    createdAt: Date
  }

  input AddressInput {
    street: String
    city: String
    state: String
    zip: Number
  }

  type Auth {
    token: ID!
    user: User
  }

  ##############  Queries
  type Query {
    user(username: String!): User
    me: User
    getOrderByStatus(status: [Status]!): Order

  }

  ##############  Mutations
  type Mutation {
    # Add a new user (signup)
    addUser(input: UserInput!): Auth

    # Login user and return JWT token (signin)
    loginUser(email: String!, password: String!): Auth

    # create an order
    order(input: OrderInput!): Order

    ############### create address VERY UNSURE, NEEDS LOOKING INTO - ethan
    addAddress(OrderId:ID, input: AddressInput!): Order

    ############### update status VERY UNSURE, NEEDS LOOKING INTO - ethan
    changeStatus(OrderId:ID, status: String!): Order

    ############### may need to look into the addition of more mutations. 
  }
`;

export default typeDefs;
