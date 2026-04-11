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
    cy.getByData("update-customer-public-link-edit-button")
      .filter(":visible")
      .click();
    cy.getByData("customer-public-link-field").within(() =>
      cy.get("input").should("have.value", "https://example.com/customer-1"),
    );
    cy.getByData("customer-public-link-field")
      .clear()
      .type("https://example.com/updated-public-link");
    cy.get('button[type="submit"]').click();
    cy.getByData("customer-public-link-detail-info").contains(
      "https://example.com/updated-public-link",
    );
  });

  it("shows empty phone number message when phone number is cleared", () => {
    cy.getByData("update-customer-public-link-edit-button")
      .filter(":visible")
      .click();
    cy.getByData("customer-public-link-field").clear();
    cy.get('button[type="submit"]').click();
    cy.getByData("customer-public-link-detail-info").contains("No public link");
  });
});
