describe("template spec", () => {
  context("Navbar", () => {
    it("should show the login modal when the 'Login / Sign Up' link is clicked", () => {
      cy.visit("/");

      cy.findByRole("button", { name: /login \/ sign up/i })
        .should("be.visible")
        .click();

      cy.findByRole("dialog", { name: /login/i }).should("be.visible");
      cy.findByRole("button", { name: /submit/i }).should("be.disabled");

      cy.findByTestId('email')
        .should("be.visible")
        .type("test@test.com")
        .should("have.value", "test@test.com");

      cy.findByTestId('password')
        .should("be.visible")
        .type("test")
        .should("have.value", "test");

      cy.findByTestId('submit').should("be.enabled");
    });
  });
});
