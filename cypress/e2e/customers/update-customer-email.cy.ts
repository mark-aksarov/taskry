import {
  users,
  accounts,
  positions,
  workspaces,
  companies,
  customers,
} from "@/prisma/test-utils/data";

describe("Customer email updating", () => {
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

  it("updates a customer email successfully", () => {
    cy.getByData("update-customer-email-edit-button")
      .filter(":visible")
      .click();
    cy.getByData("customer-email-field").within(() =>
      cy.get("input").should("have.value", "customer-1@test.com"),
    );
    cy.getByData("customer-email-field")
      .clear()
      .type("updated-customer-email@test.com");
    cy.get('button[type="submit"]').click();
    cy.getByData("customer-email-detail-info").contains(
      "updated-customer-email@test.com",
    );
  });

  it("shows validation error and prevents submission with empty email", () => {
    cy.getByData("update-customer-email-edit-button")
      .filter(":visible")
      .click();
    cy.getByData("customer-email-field").clear();
    cy.get('button[type="submit"]').click();
    cy.getByData("customer-email-field").contains(/email is required/i);
  });
});
