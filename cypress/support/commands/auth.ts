Cypress.Commands.add("signIn", (email, password) => {
  cy.request("POST", "/api/auth/test-signin", {
    email,
    password,
  });
});
