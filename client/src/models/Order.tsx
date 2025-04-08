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
  atmCount: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  status: 'PENDING' | 'SCHEDULED' | 'DENIED' | 'PAST';
  createdAt: string;
  updatedAt: string;
}
