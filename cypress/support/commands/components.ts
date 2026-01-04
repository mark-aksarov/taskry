Cypress.Commands.add("changeSelection", (dataTestAttribute, key) => {
  cy.getByData(dataTestAttribute).click();
  return cy
    .get('li[role="option"]')
    .filter(':not([aria-selected="true"])')
    .filter(`[data-key=${key}]`)
    .first()
    .click();
});

Cypress.Commands.add("getMenuItem", (dataTestAttribute, key) => {
  cy.getByData(dataTestAttribute).eq(0).click();
  return cy.get('li[role="menuitem"]').filter(`[data-key=${key}]`).first();
});

Cypress.Commands.add(
  "setDatePickerDate",
  (dataTestAttribute, month, day, year) => {
    return cy.getByData(dataTestAttribute).within(() => {
      cy.getByRole("spinbutton").eq(0).clear().type(month);
      cy.getByRole("spinbutton").eq(1).clear().type(day);
      cy.getByRole("spinbutton").eq(2).clear().type(year);
    });
  },
);
