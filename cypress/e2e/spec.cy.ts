describe('Admin Login', () => {
  context('Navbar Login', () => {
    it("should show the login modal when the 'Login' link is clicked", () => {
      const email: string = 'admin@test.com';
      const password: string = 'bootcamp';

      cy.visit('/');

      cy.findByRole('button', { name: /login/i })
        .should('be.visible')
        .click();

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

      cy.findByRole('link', { name: /home/i }).should('be.visible');

      // Admin dashboard should be available now
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
  });
});
