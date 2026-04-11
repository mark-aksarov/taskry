import {
  users,
  accounts,
  positions,
  workspaces,
  companies,
  customers,
} from "@/prisma/test-utils/data";

describe("Customer phone number updating", () => {
  beforeEach(() => {
    const payload = {
      workspaces,
      users,
      accounts,
      positions,
      companies,
      customers,
    };

    cy.viewport(414, 896);
    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/customers/1");
  });

  it("updates a customer phone number successfully", () => {
    cy.getByData("update-customer-phone-number-edit-button")
      .filter(":visible")
      .click();
    cy.getByData("customer-phone-number-field").within(() =>
      cy.get("input").should("have.value", "123-456-7890"),
    );
    cy.getByData("customer-phone-number-field").clear().type("+1234567890");
    cy.get('button[type="submit"]').click();
    cy.getByData("customer-phone-number-detail-info").contains("+1234567890");
  });

  it("shows empty phone number message when phone number is cleared", () => {
    cy.getByData("update-customer-phone-number-edit-button")
      .filter(":visible")
      .click();
    cy.getByData("customer-phone-number-field").clear();
    cy.get('button[type="submit"]').click();
    cy.getByData("customer-phone-number-detail-info").contains(
      "No phone number",
    );
  });
});
