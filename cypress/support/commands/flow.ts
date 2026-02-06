Cypress.Commands.add(
  "fillEditForm",
  (data: {
    fullName: string;
    bio: string;
    birthdate: { day: string; month: string; year: string };
    phoneNumber: string;
    publicLink: string;
    address: string;
    positionId: string;
  }) => {
    const birthdate = data.birthdate;

    cy.get('input[name="fullName"]').clear().type(data.fullName);
    cy.get('textarea[name="bio"]').clear().type(data.bio);
    cy.setDatePickerDate(
      "birthdate-date-picker",
      birthdate.day,
      birthdate.month,
      birthdate.year,
    );
    cy.get('input[name="phoneNumber"]').clear().type(data.phoneNumber);
    cy.get('input[name="publicLink"]').clear().type(data.publicLink);
    cy.get('input[name="address"]').clear().type(data.address);
    cy.getByData("position-select").click();
    cy.getSelectOption(data.positionId).click();
    cy.get('button[type="submit"]').click();
  },
);

Cypress.Commands.add("changePassword", (newPassword: string) => {
  cy.getByData("change-password-button").filter(":visible").click();
  cy.get('input[name="password"]').clear().type(newPassword);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add(
  "signInViaUI",
  (email: string, password: string, callbackUrl: string = "/") => {
    cy.visit(`/en/sign-in?callbackUrl=${callbackUrl}`);
    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/");
  },
);

Cypress.Commands.add("signOutViaUI", () => {
  cy.getByData("sign-out-btn").click();
  cy.url().should("include", "/sign-in");
});
