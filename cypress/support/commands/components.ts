Cypress.Commands.add("getMenuItem", (key) => {
  return cy.get(`[data-key="${key}"]`);
});

Cypress.Commands.add("getSelectOption", (key) => {
  return cy.get(`[data-key="${key}"]`);
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
