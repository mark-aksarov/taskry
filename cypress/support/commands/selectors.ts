Cypress.Commands.add("getByData", (selector) => {
  return cy.get(`[data-test=${selector}]`);
});

Cypress.Commands.add("getByRole", (selector) => {
  return cy.get(`[role*=${selector}]`);
});
