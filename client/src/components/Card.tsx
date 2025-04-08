import React, { useState } from "react";
import { Card as BootstrapCard, Button, Modal } from "react-bootstrap";
import { Order } from "../models/Order";

interface CardProps {
  order: Order;
}

const Card: React.FC<CardProps> = ({ order }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  return (
    <>
      <BootstrapCard className="mb-4">
        <BootstrapCard.Header className="d-flex justify-content-end">
          <Button variant="danger">Deny</Button>
        </BootstrapCard.Header>
        <BootstrapCard.Body>
          <BootstrapCard.Title>
            {order.firstName} {order.lastName}
          </BootstrapCard.Title>
          <BootstrapCard.Text>Email: {order.email}</BootstrapCard.Text>
          <BootstrapCard.Text>Phone: {order.phoneNumber}</BootstrapCard.Text> {/* Updated */}
          <BootstrapCard.Text>Event: {order.eventName}</BootstrapCard.Text>
        </BootstrapCard.Body>
        <BootstrapCard.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleModalShow}>
            Info
          </Button>
          <Button variant="primary">Approve</Button>
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
            <strong>Phone:</strong> {order.phoneNumber} {/* Updated */}
          </p>
          <p>
            <strong>Event Name:</strong> {order.eventName}
          </p>
          <p>
            <strong>Start Date:</strong>{" "}
            {order.startDate ? new Date(order.startDate).toLocaleDateString() : "N/A"}
          </p>
          <p>
            <strong>End Date:</strong>{" "}
            {order.endDate ? new Date(order.endDate).toLocaleDateString() : "N/A"}
          </p>
          <p>
            <strong>Description:</strong> {order.description}
          </p>
          <p>
            <strong>ATM Count:</strong> {order.atmCount} {/* Updated */}
          </p>
          <p>
            <strong>Address:</strong> {order.address.street}, {order.address.city},{" "}
            {order.address.state} {order.address.zip}
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