/*
 * Queries
 *
 * Defines the queries for the GraphQL API.
 *
 * Retrieve user data
 *
 */

import { gql } from "@apollo/client";

/**
 * User query
 *
 * Input: username
 *
 * Fetches a specific user's data.
 *
 */
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

/**
 * Me query
 *
 * Input: none
 *
 * The logged-in user's credentials are used automatically
 * .
 */
export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
    }
  }
`;
