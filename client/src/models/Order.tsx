/*
 * Order model
 *
 * Define the structure of a User object to ensure that all user data has a
 * consistent shape.
 *
 */

export enum OrderStatus {
  PENDING = 'PENDING',
  SCHEDULED = 'SCHEDULED',
  DENIED = 'DENIED',
  PAST = 'PAST'
}

export interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  eventName: string;
  startDate: string;
  endDate: string;
  description: string;
  atmCount: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
