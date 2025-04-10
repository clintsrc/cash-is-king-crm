import { MockedProvider } from "@apollo/client/testing";
import { mount } from "cypress/react";
import SignupForm from "../../client/src/components/SignupForm";
import { LOGIN_USER } from "../../client/src/utils/mutations";

const username: string = "admin";
const email: string = "admin@test.com";
const password: string = "password";

const mocks = [
  {
    request: {
      query: LOGIN_USER,
      variables: {
        username: username,
        password: password,
      },
    },
    result: {
      data: {
        login: {
          __typename: "LoginResponse",
          token: "mocked-token",
          user: {
            __typename: "User",
            id: "1",
            email: email,
          },
        },
      },
    },
  },
];

describe("<SignupForm />", () => {
  it("should submit the form and get a successful response", () => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignupForm handleModalClose={() => console.log("Modal closed")} />
      </MockedProvider>
    );

    cy.get("input[name='email']").type(email);
    cy.get("input[name='password']").type(password);
    cy.get("button[type='submit']").should('be.visible');

    cy.findByPlaceholderText(/your username/i)
      .should("be.visible")
      .should('be.enabled')
      .type(username);

    cy.findByPlaceholderText(/your email address/i)
      .should("be.visible")
      .should('be.enabled')
      .type(email);

    cy.findByPlaceholderText(/your password/i)
      .should("be.visible")
      .should('be.enabled')
      .type(password);

    cy.findByText(/submit/i)
      .should("be.visible")
      .should('be.enabled')
      .click()
  });
});
