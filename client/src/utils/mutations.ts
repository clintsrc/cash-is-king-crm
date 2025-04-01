/*
 * Mutations
 *
 * Defines the mutations for the GraphQL API. Modifies data with create, update, and
 *  delete actions
 *
 * Provides GraphQL mutations for managing users (signup and login)
 *
 */

import { gql } from "@apollo/client";


/**
 * User management
 */
export const ADD_USER = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      user {
        username
        _id
        email
      }
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
