import {
  users,
  accounts,
  positions,
  workspaces,
  companies,
  customers,
} from "@/prisma/test-utils/data";

describe("Customer full name updating", () => {
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

  it("updates a customer full name successfully", () => {
    cy.getByData("update-customer-full-name-edit-button")
      .filter(":visible")
      .click();
    cy.getByData("customer-full-name-field").within(() =>
      cy.get("input").should("have.value", "Customer 1"),
    );
    cy.getByData("customer-full-name-field")
      .clear()
      .type("Updated Customer Full Name");
    cy.get('button[type="submit"]').click();
    cy.getByData("customer-full-name-detail-info").contains(
      "Updated Customer Full Name",
    );
  });

  it("shows validation error and prevents submission with empty full name", () => {
    cy.getByData("update-customer-full-name-edit-button")
      .filter(":visible")
      .click();
    cy.getByData("customer-full-name-field").clear();
    cy.get('button[type="submit"]').click();
    cy.getByData("customer-full-name-field").contains(/full name is required/i);
  });
});
