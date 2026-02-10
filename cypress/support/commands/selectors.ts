Cypress.Commands.add("getByData", (selector: string, id?: string) => {
  if (id) {
    return cy.get(`[data-test="${selector}"][data-id="${id}"]`);
  }
  return cy.get(`[data-test="${selector}"]`);
});

Cypress.Commands.add("getByRole", (selector) => {
  return cy.get(`[role*=${selector}]`);
});
