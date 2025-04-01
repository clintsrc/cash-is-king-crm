/*
 * LoginForm component
 *
 * Handles user login by executing the GraphQL LOGIN_USER mutation.
 * The form collects the user's email and password, sends them to the backend,
 *  and if successful, stores the JWT token in the Auth object for authentication.
 *
 * Also manages error handling and provides user feedback in case of failure.
 *
 */
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import type { User } from "../models/User";

// biome-ignore lint/correctness/noEmptyPattern: <explanation>
const LoginForm = ({ handleModalClose }: { handleModalClose: () => void }) => {
  const [userFormData, setUserFormData] = useState<User>({
    username: "",
    email: "",
    password: "",
  });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // useMutation hook provides GraphQL support to execute the login mutation
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      // Execute the LOGIN_USER mutation with email and password as variables
      const { data } = await loginUser({
        variables: {
          email: userFormData.email,
          password: userFormData.password,
        },
      });

      // Extract the JWT token from the response then store it in the Auth object
      const { token } = data.loginUser;
      Auth.login(token);

      // Close the modal if login on success
      handleModalClose();
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    // Reset the form after submission
    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            data-testid="email"
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email || ""}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            data-testid="password"
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password || ""}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          data-testid="submit"
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
      {/* Show error details for a failed login */}
      {error && <Alert variant="danger">{error.message}</Alert>}
    </>
  );
};

export default LoginForm;
