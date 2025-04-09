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
import SignupForm from './SignupForm';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'login' | 'signup'>('login'); // Track modal type

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid className="d-flex justify-content-between">
          <Navbar.Brand as={Link} to="/">
            Cash is King ATM
          </Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {/* if user is logged in show admin link, add user button, and logout */}
            {Auth.loggedIn() ? (
              <>
                <Nav.Link as={Link} to="/admin">
                  Admin Dashboard
                </Nav.Link>
                <Nav.Link onClick={() => {
                  setModalType('signup'); // Set modal type to "signup"
                  setShowModal(true);
                }}>
                  Add User
                </Nav.Link>
                <Nav.Link onClick={Auth.logout}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={() => {
                setModalType('login'); // Set modal type to "login"
                setShowModal(true);
              }}>
                Login
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === 'signup' ? 'Add User' : 'Login'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === 'signup' ? (
            <SignupForm handleModalClose={() => setShowModal(false)} />
          ) : (
            <LoginForm handleModalClose={() => setShowModal(false)} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AppNavbar;
