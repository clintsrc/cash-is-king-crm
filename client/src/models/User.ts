/*
 * User model
 *
 * Define the structure of a User object to ensure that all user data has a
 * consistent shape.
 *
 */

export interface User {
  username: string | null;
  email: string | null;
  password: string | null;
}
