import React, { useState } from 'react';
import { Card as BootstrapCard, Button, Modal } from 'react-bootstrap';
import { Order, OrderStatus } from '../models/Order';
import { useMutation } from '@apollo/client';
import { UPDATE_ORDER_STATUS, DELETE_ORDER } from '../utils/queries';

interface CardProps {
  order: Order;
  onStatusChange?: () => void;
}

const Card: React.FC<CardProps> = ({ order, onStatusChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS, {
    onCompleted: () => {
      setIsUpdating(false);
      if (onStatusChange) {
        onStatusChange();
      }
    },
    onError: error => {
      console.error('Error updating order status:', error);
      setIsUpdating(false);
    }
  });

  const [deleteOrder] = useMutation(DELETE_ORDER, {
    onCompleted: () => {
      setIsUpdating(false);
      if (onStatusChange) {
        onStatusChange();
      }
    },
    onError: error => {
      console.error('Error deleting order:', error);
      setIsUpdating(false);
    }
  });

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleApprove = async () => {
    try {
      setIsUpdating(true);
      await updateOrderStatus({
        variables: {
          id: order._id,
          status: OrderStatus.SCHEDULED
        }
      });
    } catch (error) {
      console.error('Error approving order:', error);
      setIsUpdating(false);
    }
  };

  const handlePast = async () => {
    try {
      setIsUpdating(true);
      await updateOrderStatus({
        variables: {
          id: order._id,
          status: OrderStatus.PAST
        }
      });
    } catch (error) {
      console.error('Error approving order:', error);
      setIsUpdating(false);
    }
  };

  const handleDeny = async () => {
    try {
      setIsUpdating(true);
      await updateOrderStatus({
        variables: {
          id: order._id,
          status: OrderStatus.DENIED
        }
      });
    } catch (error) {
      console.error('Error denying order:', error);
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsUpdating(true);
      await deleteOrder({
        variables: {
          id: order._id
        }
      });
    } catch (error) {
      console.error('Error deleting order:', error);
      setIsUpdating(false);
    }
  };

  return (
    <>
      <BootstrapCard className="mb-4">
        <BootstrapCard.Header className="d-flex justify-content-end">
          {order.status === OrderStatus.DENIED ? (
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={isUpdating}
            >
              {isUpdating ? 'Deleting...' : 'Delete'}
            </Button>
          ) : order.status === OrderStatus.SCHEDULED ? (
            <Button
              variant="success"
              onClick={handlePast}
              disabled={isUpdating}
            >
              {isUpdating ? 'completing' : 'Move to Past'}
            </Button>
          ) : (
            order.status !== OrderStatus.PAST && (
              <Button
                variant="danger"
                onClick={handleDeny}
                disabled={
                  isUpdating ||
                  (order.status as OrderStatus) === OrderStatus.DENIED
                }
              >
                {isUpdating ? 'Denying...' : 'Deny'}
              </Button>
            )
          )}
        </BootstrapCard.Header>
        <BootstrapCard.Body>
          <BootstrapCard.Title>
            {order.firstName} {order.lastName}
          </BootstrapCard.Title>
          <BootstrapCard.Text>Email: {order.email}</BootstrapCard.Text>
          <BootstrapCard.Text>Phone: {order.phoneNumber}</BootstrapCard.Text>
          <BootstrapCard.Text>Event: {order.eventName}</BootstrapCard.Text>
        </BootstrapCard.Body>
        <BootstrapCard.Footer
          className={`d-flex ${
            order.status === OrderStatus.SCHEDULED ||
            order.status === OrderStatus.PAST
              ? 'justify-content-center'
              : 'justify-content-between'
          }`}
        >
          <Button variant="info" onClick={handleModalShow}>
            Info
          </Button>
          {order.status !== OrderStatus.SCHEDULED &&
            order.status !== OrderStatus.PAST && (
              <Button
                variant="primary"
                onClick={handleApprove}
                disabled={
                  isUpdating ||
                  (order.status as OrderStatus) === OrderStatus.SCHEDULED
                }
              >
                {isUpdating ? 'Approving...' : 'Approve'}
              </Button>
            )}
        </BootstrapCard.Footer>
      </BootstrapCard>

      {/* Modal for displaying all order details */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Name:</strong> {order.firstName} {order.lastName}
          </p>
          <p>
            <strong>Email:</strong> {order.email}
          </p>
          <p>
            <strong>Phone:</strong> {order.phoneNumber}
          </p>
          <p>
            <strong>Event Name:</strong> {order.eventName}
          </p>
          <p>
            <strong>Start Date:</strong>{' '}
            {order.startDate
              ? new Date(order.startDate).toLocaleDateString()
              : 'N/A'}
          </p>
          <p>
            <strong>End Date:</strong>{' '}
            {order.endDate
              ? new Date(order.endDate).toLocaleDateString()
              : 'N/A'}
          </p>
          <p>
            <strong>Description:</strong> {order.description}
          </p>
          <p>
            <strong>ATM Count:</strong> {order.atmCount}
          </p>
          <p>
            <strong>Address:</strong> {order.address.street},{' '}
            {order.address.city}, {order.address.state} {order.address.zip}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Card;
