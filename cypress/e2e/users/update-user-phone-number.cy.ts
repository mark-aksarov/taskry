import {
  users,
  accounts,
  positions,
  workspaces,
} from "@/prisma/test-utils/data";

describe("User phone number updating", () => {
  beforeEach(() => {
    const payload = {
      workspaces,
      users,
      accounts,
      positions,
    };

    cy.viewport(1440, 900);
    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/profile");
  });

  it("updates a user phone number successfully", () => {
    cy.getByData("update-user-phone-number-edit-button")
      .filter(":visible")
      .click();
    cy.getByData("user-phone-number-field").within(() =>
      cy.get("input").should("have.value", "phone 1"),
    );
    cy.getByData("user-phone-number-field").clear().type("+1234567890");
    cy.get('button[type="submit"]').click();
    cy.getByData("user-phone-number-detail-info").contains("+1234567890");
  });

  it("shows empty phone number message when phone number is cleared", () => {
    cy.getByData("update-user-phone-number-edit-button")
      .filter(":visible")
      .click();
    cy.getByData("user-phone-number-field").clear();
    cy.get('button[type="submit"]').click();
    cy.getByData("user-phone-number-detail-info").contains("No phone number");
  });
});
