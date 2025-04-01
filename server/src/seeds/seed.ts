import db from '../config/connection.js';
import cleanDb from './cleanDB.js';
import { User } from '../models/index.js';
import bcrypt from 'bcrypt';
import { signToken } from '../utils/auth.js';
import userData from './userData.json' with { type: 'json' };

async function seedDatabase() {
  try {
    await db();
    await cleanDb();

    // Hash the passwords and generate JWT tokens before inserting into the database
    const hashedUserData = await Promise.all(
      userData.map(async (user) => {
        // Hash the password
        const hashedPassword = await bcrypt.hash(user.password, 10);

        // Generate a JWT token (this can be optional based on your use case)
        const token = signToken(user.username, user.email, '');

        // Return the user data with hashed password and token
        return {
          username: user.username,
          email: user.email,
          password: hashedPassword,
          token: token, // Optional: Only if you need to store the JWT in the database
        };
      })
    );

    // Insert the hashed user data into the database
    await User.insertMany(hashedUserData); // Seed the user data

    console.log('Users seeded!');
    process.exit(0); // Exit the process after seeding
  } catch (error) {
    console.error('Error in database seeding:', error);
    process.exit(1); // Exit with an error code
  }
}

seedDatabase();