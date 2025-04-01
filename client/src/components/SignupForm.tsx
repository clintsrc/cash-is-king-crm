/*
 * SignUpForm component
 *
 * Handles user signup by executing the GraphQL ADD_USER mutation.
 * The form collects the user's username, email, and password, then sends them to
 *  the backend.
 * If the signup is successful, the JWT token is stored in the Auth object for
 *  authentication.
 *
 * Manages error handling and provides user feedback in case of a failed signup attempt.
 * After successful signup, the modal is closed, and the form is reset.
 */

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

// Interface to handle the modal close function passed as a prop
interface SignUpFormProps {
  handleModalClose: () => void;
}

const SignupForm: React.FC<SignUpFormProps> = ({ handleModalClose }) => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  // state for form validation
  const [validated] = useState(false);
  // state for alert if signup fails
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Handles form submission and triggers the ADD_USER mutation
  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      // Executes the ADD_USER mutation using form state data as input variables
      const { data } = await addUser({
        variables: { input: { ...formState } },
      });

      // Extract JWT token from the response and store it in Auth for authentication
      const { token } = data.addUser;
      Auth.login(token);

      handleModalClose(); // Close the modal after a successful signup
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setFormState({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      {/* Form with validation */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* Show alert if there's an error */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        {/* Username input */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={formState.username || ""}
            required
          />
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email input */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={formState.email || ""}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        {/* Password input */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={formState.password || ""}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>

        {/* Submit button */}
        <Button
          disabled={
            !(formState.username && formState.email && formState.password)
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>

      {/* Show error details for a failed signup */}
      {error && <Alert variant="danger">{error.message}</Alert>}
    </>
  );
};

export default SignupForm;
