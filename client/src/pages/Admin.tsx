import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { QUERY_ORDERS } from "../utils/queries";
import Card from "../components/Card";
import "./Admin.css";

const Admin = () => {
  // State for tracking the active status
  const [activeStatus, setActiveStatus] = useState("Pending");

  // GraphQL query to fetch all orders
  const { loading, error, data } = useQuery(QUERY_ORDERS);

  // Handler for clicking a status button
  const handleStatusClick = (status: string) => {
    setActiveStatus(status);
  };

  // Filter orders based on the active status
  const filteredOrders = data?.orders.filter(
    (order: any) => order.status === activeStatus
  );

  return (
    <Container>
      {/* Top status buttons */}
      <div className="top-buttons d-flex justify-content-center my-3">
        {["Pending", "Scheduled", "Past", "Denied"].map((status) => (
          <Button
            key={status}
            className={`mx-2 ${activeStatus === status ? "active" : ""}`}
            onClick={() => handleStatusClick(status)}
            size="lg"
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Orders section */}
      <Row>
        {loading && <p>Loading orders...</p>}
        {error && <p>Error loading orders: {error.message}</p>}
        {!loading &&
          !error &&
          filteredOrders?.map((order: any) => (
            <Col md={4} className="mb-4" key={order._id}>
              <Card order={order} />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Admin;