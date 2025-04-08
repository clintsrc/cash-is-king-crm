import { gql } from '@apollo/client';
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
/**
 * Orders query
 *
 * Fetches all orders.
 */
export const QUERY_ORDERS = gql`
  query GetOrders {
    orders {
      _id
      firstName
      lastName
      email
      phoneNumber
      eventName
      startDate
      endDate
      description
      atmCount
      address {
        street
        city
        state
        zip
      }
      status
      createdAt
      updatedAt
    }
  }
`;
/**
 * Single Order query
 *
 * Input: id
 *
 * Fetches a specific order by ID.
 */
export const QUERY_ORDER = gql`
  query order($id: ID!) {
    order(id: $id) {
      _id
      eventName
      description
      firstName
      lastName
      phoneNumber
      status
      atmCount
      startDate
      endDate
      address {
        city
        street
        state
        zip
      }
      createdAt
      updatedAt
    }
  }
`;