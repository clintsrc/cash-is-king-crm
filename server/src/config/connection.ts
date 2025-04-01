/*
 * Connection
 *
 * Manage the connection to the mongodb server through mongoose.
 * The database is initially created when a collection is accessed
 *
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); // check the env for MONGODB_URI

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cash_is_king_db';

const db = async (): Promise<typeof mongoose.connection> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected.');
    return mongoose.connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed.');
  }
};

export default db;
