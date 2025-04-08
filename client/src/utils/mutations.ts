import { gql } from '@apollo/client';
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
/**
 * Order management
 */
export const CREATE_ORDER = gql`
  mutation orderCreate($input: OrderInput!) {
    orderCreate(input: $input) {
      _id
      eventName
      description
      firstName
      lastName
      phoneNumber
      email
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
export const DELETE_ORDER = gql`
  mutation orderDelete($id: ID!) {
    orderDelete(id: $id)
  }
`;
export const UPDATE_ORDER_STATUS = gql`
  mutation orderUpdate($id: ID!, $status: OrderStatus!) {
    orderUpdate(id: $id, status: $status) {
      _id
      eventName
      description
      firstName
      lastName
      phoneNumber
      email
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