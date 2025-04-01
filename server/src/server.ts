/*
 * MERN Server (Entry Point)
 *
 * Connects to MongoDB and exposes GraphQL API endpoints.
 * Allows users to create accounts, authenticate via JWT.
 * Configures an Express server that hosts an Apollo GraphQL API to interact with the
 *  database.
 *
 * You can use a GraphQL tool such as Apollo Sandbox to interact with the server:
 * https://www.apollographql.com/
 *
 */

import dotenv from 'dotenv';
dotenv.config(); // check the env for PORT

import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';
import type { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import db from './config/connection.js';

// Ensure JWT_SECRET_KEY is set
if (!process.env.JWT_SECRET_KEY) {
  console.error('Error: JWT_SECRET_KEY is not set.');
  process.exit(1);
}

// Create an Apollo Server specifying the API schema, queries, and mutations
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Define the Apollo Server API configuration
const startApolloServer = async () => {
  await server.start(); // start the apollo server
  await db(); // connect to the mongodb

  // Default to port 3001 if the port is not specified
  const PORT = process.env.PORT || 3001;
  // Define the express server
  const app = express();

  // Configure Express to enable URL encoding
  app.use(express.urlencoded({ extended: true }));
  // Configure Express to support JSON requests
  app.use(express.json());

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: ({ req }) => authenticateToken({ req }),
    })
  );

  /*
   * In production, serve the built 'client/dist' content as a static asset.
   * In development mode, Vite serves the client.
   */
  if (process.env.NODE_ENV === 'production') {
    console.log('Serving in production mode');

    // Manually define __dirname in ES modules
    // get the full path to this running server module
    const __filename = fileURLToPath(import.meta.url);
    // get the directory of the running module
    const __dirname = path.dirname(__filename);
    // point to the static client build
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    // Redirect all unspecified routes to the index page (SPA fallback)
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }

  // Express is up and running, listening for incoming client requests
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
};

// The main function initializes and starts the MERN server
startApolloServer();
