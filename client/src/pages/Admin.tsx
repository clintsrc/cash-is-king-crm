import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ORDERS } from '../utils/queries';
import Card from '../components/Card';
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { Order } from '../models/Order';
import './Admin.css';

interface OrdersData {
  orders: Order[];
}

const Admin = () => {
  const [activeStatus, setActiveStatus] = useState<string>('PENDING');

  const { loading, error, data, refetch } = useQuery<OrdersData>(QUERY_ORDERS);

  // Add debug logging
  console.log('Admin Component - Error:', error);
  console.log('Admin Component - Data:', data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const orders = data?.orders || [];
  console.log(
    'Filtered Orders:',
    orders.filter((order: Order) => order.status === activeStatus)
  );

  const handleStatusClick = (status: string) => {
    setActiveStatus(status);
  };

  // Handler for order status changes
  const handleOrderStatusChange = () => {
    refetch();
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      <ButtonGroup className="mb-4 w-100">
        <Button
          variant={activeStatus === 'PENDING' ? 'primary' : 'outline-primary'}
          onClick={() => handleStatusClick('PENDING')}
        >
          Pending
        </Button>
        <Button
          variant={activeStatus === 'SCHEDULED' ? 'primary' : 'outline-primary'}
          onClick={() => handleStatusClick('SCHEDULED')}
        >
          Scheduled
        </Button>
        <Button
          variant={activeStatus === 'DENIED' ? 'primary' : 'outline-primary'}
          onClick={() => handleStatusClick('DENIED')}
        >
          Denied
        </Button>
        <Button
          variant={activeStatus === 'PAST' ? 'primary' : 'outline-primary'}
          onClick={() => handleStatusClick('PAST')}
        >
          Past
        </Button>
      </ButtonGroup>
      <Row>
        {orders
          .filter((order: Order) => order.status === activeStatus)
          .map((order: Order) => (
            <Col key={order._id} xs={12} md={6} lg={4} className="mb-4">
              <Card order={order} onStatusChange={handleOrderStatusChange} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Admin;
