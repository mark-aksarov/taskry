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
      if (!month)
        cy.getByRole("spinbutton").eq(0).type("{backspace}{backspace}");
      else cy.getByRole("spinbutton").eq(0).type(month);

      if (!day) cy.getByRole("spinbutton").eq(1).type("{backspace}{backspace}");
      else cy.getByRole("spinbutton").eq(1).type(day);

      if (!year)
        cy.getByRole("spinbutton")
          .eq(2)
          .type("{backspace}{backspace}{backspace}{backspace}");
      else cy.getByRole("spinbutton").eq(2).type(year);
    });
  },
);
