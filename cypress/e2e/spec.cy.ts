describe('Cash Is King CRM', () => {
  context('Admin Access', () => {
    const email: string = 'admin@test.com';
    const password: string = 'bootcamp';

    beforeEach(() => {
      cy.visit('/');

      // Investigate adding the login steps as Cypress.Commands
      cy.findByRole('button', { name: /login/i })
        .should('be.visible')
        .click();

      // should show login modal when the 'Login' link is clicked
      cy.findByTestId('email')
        .should('be.visible')
        .parents('.modal-dialog')
        .should('be.visible');

      cy.findByTestId('submit').should('be.visible');

      cy.findByTestId('email')
        .should('be.visible')
        .type(email)
        .should('have.value', email);

      cy.findByTestId('password')
        .should('be.visible')
        .type(password)
        .should('have.value', password);

      cy.findByTestId('submit')
        .should('be.enabled')
        .click();
    });

    it("should show the expected navbar links when an admin is logged in", () => {
      cy.findByRole('link', { name: /home/i }).should('be.visible');

      cy.findByRole('link', { name: /admin dashboard/i })
        .should('be.visible');

      cy.findByRole('button', { name: /logout/i })
        .should('be.visible');
    });

    it("should order status columns in the admin dashboard", () => {
      cy.findByRole('link', { name: /admin dashboard/i })
        .should('be.visible')
        .click();

      cy.findByRole('button', { name: /pending/i })
        .should('be.visible')
        .click();

      cy.findByRole('button', { name: /scheduled/i })
        .should('be.visible')
        .click();

      cy.findByRole('button', { name: /denied/i })
        .should('be.visible')
        .click();

      cy.findByRole('button', { name: /past/i })
        .should('be.visible')
        .click();

      cy.findByRole('button', { name: /logout/i })
        .should('be.visible')
        .click();

      cy.findByRole('button', { name: /login/i }).should('be.visible');
    });

    it("should log the admin user out when the logout link is clicked", () => {
      cy.findByRole('button', { name: /logout/i })
        .should('be.visible')
        .click();

      cy.findByRole('button', { name: /login/i }).should('be.visible');
    });
  });
});
