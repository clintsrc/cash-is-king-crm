/*
 * Order model
 *
 * Define the structure of a User object to ensure that all user data has a
 * consistent shape.
 *
 */

export interface Order {
    firstName: string;
    lastName: string;
    eventName: string;
    startDate: Date;
    endDate: Date;
    description: string;
    phoneNumber: string; // Updated from `phone`
    email: string;
    atmCount: string; // Updated from `number`
    createdAt: Date;
    updatedAt: Date;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    status: "PENDING" | "SCHEDULED" | "DENIED" | "PAST"; // Updated to match backend enum
  }
  