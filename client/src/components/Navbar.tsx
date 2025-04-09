/*
 * Navbar component
 *
 * Handles page loading and manages the HTML header.
 *
 * Displays a modal dialog for user authentication (login and signup options).
 *
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal } from 'react-bootstrap';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';
import './Navbar.css';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg="light" variant="light" expand="lg">
        <Container fluid className="d-flex justify-content-between">
          <Nav>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {/* if user is logged in show admin link and logout */}
            {Auth.loggedIn() ? (
              <>
                <Nav.Link as={Link} to="/admin">
                  Admin Dashboard
                </Nav.Link>
                <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={() => setShowModal(true)}>Login</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      {/* Login Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm handleModalClose={() => setShowModal(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AppNavbar;
