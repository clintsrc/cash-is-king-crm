/*
 * GraphQL Resolvers
 *
 * Defines the functions that handle GraphQL queries and mutations.
 * Acts as the middleware layer between GraphQL and the MongoDB database.
 * Uses Mongoose models to fetch, modify, and return data based on client requests.
 *
 */

import { User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

// Define interfaces for mutation arguments

// Queries
interface UserArgs {
  username: string;
}

// Mutations
interface AddUserArgs {
  // signup
  input: {
    username: string;
    email: string;
    password: string;
  };
}

interface LoginUserArgs {
  // signin
  email: string;
  password: string;
}

interface Context {
  user?: {
    _id: string;
    username: string;
    email: string;
  };
}

const resolvers = {
  /***
   * Queries
   */
  Query: {
    // return the user's information
    user: async (_parent: unknown, { username }: UserArgs) => {
      console.log('user Received input:', username);
      return User.findOne({ username });
    },

    // Get the authenticated user's information from the context payload
    me: async (_parent: unknown, _args: unknown, context: Context) => {
      /* If the user is authenticated, find their user information */
      console.log('me Received for user:', context.user?._id);
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      // If the user is not authenticated, throw an AuthenticationError
      throw new AuthenticationError('Could not authenticate user.');
    },
  },

  /***
   * Mutations
   */
  Mutation: {
    // Create a new user and return a token (signup)
    addUser: async (_parent: unknown, { input }: AddUserArgs) => {
      console.log('addUser Received input:', input.email);
      try {
        // Create a new user with the provided username, email, and password
        const user = await User.create({ ...input });

        // Sign a token with the user's information
        const token = signToken(user.username, user.email, user._id);

        // Return the token and the user
        return { token, user };
      } catch (error) {
        throw new Error(`Error creating user: ${error}`);
      }
    },

    // Login user and return a token (signin)
    loginUser: async (_parent: unknown, { email, password }: LoginUserArgs) => {
      console.log('loginUser Received input for:', email);
      try {
        // Find a user with the provided email
        const user = await User.findOne({ email });

        // If no user is found, throw an AuthenticationError
        if (!user) {
          throw new AuthenticationError('Could not authenticate user.');
        }

        // Check if the provided password is correct
        const correctPw = await user.isCorrectPassword(password);

        // If the password is incorrect, throw an AuthenticationError
        if (!correctPw) {
          throw new AuthenticationError('Could not authenticate user.');
        }

        // Sign a token with the user's information
        const token = signToken(user.username, user.email, user._id);

        // Return the token and the user
        return { token, user };
      } catch (error) {
        throw new AuthenticationError(`Login failed ${error}`);
      }
    },
  }, // end mutations
}; // end resolvers

export default resolvers;
