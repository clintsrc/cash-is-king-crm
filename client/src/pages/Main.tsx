import './Main.css';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ORDER } from '../utils/mutations';

const Main = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    eventName: '',
    startDate: '',
    endDate: '',
    description: '',
    phoneNumber: '',
    email: '',
    atmCount: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: ''
    }
  });

  const [createOrder, { error }] = useMutation(CREATE_ORDER);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    if (id in formData.address) {
      setFormData({
        ...formData,
        address: { ...formData.address, [id]: value }
      });
    } else if (id === 'atmCount') {
      // Ensure ATM count is between 1 and 5
      const numValue = parseInt(value) || 0;
      const validValue = Math.min(Math.max(numValue, 0), 5);
      setFormData({ ...formData, [id]: validValue.toString() });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await createOrder({
        variables: {
          input: {
            ...formData,
            atmCount: parseInt(formData.atmCount) || null,
            startDate: formData.startDate ? new Date(formData.startDate) : null,
            endDate: formData.endDate ? new Date(formData.endDate) : null
          }
        }
      });
      console.log('Order created:', data);
    } catch (err) {
      console.error('Error creating order:', err);
    }
  };

  return (
    <Container>
      <h2>Rent an ATM</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="Jane"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            placeholder="123-456-7890"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="example@example.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="eventName">Event Name</label>
          <input
            type="text"
            id="eventName"
            placeholder="Event Name"
            value={formData.eventName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="atmCount">ATM Count</label>
          <input
            type="number"
            id="atmCount"
            placeholder="Number of ATMs"
            value={formData.atmCount}
            onChange={handleInputChange}
            min="1"
            max="5"
            required
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <h3>Address</h3>
          <div>
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              placeholder="Street"
              value={formData.address.street}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              placeholder="City"
              value={formData.address.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              placeholder="State"
              value={formData.address.state}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="zip">Zip Code</label>
            <input
              type="text"
              id="zip"
              placeholder="Zip"
              value={formData.address.zip}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <button type="submit">Submit</button>
        {error && <p>Error submitting the form: {error.message}</p>}
      </form>
    </Container>
  );
};

export default Main;
