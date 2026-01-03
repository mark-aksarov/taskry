Cypress.Commands.add("signIn", (email, password, callbackUrl) => {
  const url = `/en/sign-in?callbackUrl=${callbackUrl}`;
  cy.visit(url);

  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should("include", callbackUrl);
});
