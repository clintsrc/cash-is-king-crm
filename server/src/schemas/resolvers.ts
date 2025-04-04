/*
 * GraphQL Resolvers
 *
 * Defines the functions that handle GraphQL queries and mutations.
 * Acts as the middleware layer between GraphQL and the MongoDB database.
 * Uses Mongoose models to fetch, modify, and return data based on client requests.
 *
 */

import { User, Order } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';
// Adjust the path to your Order model


// Define interfaces for mutation arguments

interface OrderArgs {
  id: string;
}

interface CreateOrderArgs {
  firstName: string;
  lastName: string;
  status: string;
  address: {
    city: string;
  }
}

interface UpdateStatusArgs {
  id: string;
  status: string;
}

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

    orders: async () => {
      return await Order.find();
    },

    order: async (_parent: unknown, {id}: OrderArgs) => {
      return await Order.findById(id);
    }
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

    orderCreate: async (_parent: unknown, {input}: {input: CreateOrderArgs}) => {
      try {
        const {firstName, lastName, status, address} = input;
        const order = new Order({firstName, lastName, status, address});
        return await order.save();
      }
      catch(error) {
        throw new Error(`ERROR CREATING ORDER: ${error}`);
      }
    },

    orderDelete: async (_parent: unknown, {id}: {id: string}) => {
      try {
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
          throw new Error('ORDER NOT FOUND FOR DELETION');
        }
        return true;
      } catch(error) {
          throw new Error(`Unable TO DELETE ORDER:${error}`);
      }
    },

    orderUpdate: async (_parent: unknown, {id, status}: UpdateStatusArgs ) => {
      try {
        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
        if (!order) {
          throw new Error('ORDER NOT FOUND FOR UPDATING');
        }
        return order;
      } catch(error) {
          throw new Error(`Unable TO UPDATE ORDER:${error}`);
      }
    }
  }, // end mutations
}; // end resolvers

export default resolvers;