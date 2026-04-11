import {
  users,
  accounts,
  positions,
  workspaces,
  companies,
  customers,
} from "@/prisma/test-utils/data";

describe("User bio updating", () => {
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

  it("updates a customer bio successfully", () => {
    cy.getByData("update-customer-bio-edit-button").filter(":visible").click();
    cy.getByData("customer-bio-field").contains("Customer 1 bio");
    cy.getByData("customer-bio-field").clear().type("Updated Customer Bio");
    cy.get('button[type="submit"]').click();
    cy.getByData("customer-bio-detail-info").contains("Updated Customer Bio");
  });

  it("shows empty bio message when bio is cleared", () => {
    cy.getByData("update-customer-bio-edit-button").filter(":visible").click();
    cy.getByData("customer-bio-field").clear();
    cy.get('button[type="submit"]').click();
    cy.getByData("customer-bio-detail-info").contains(
      "This customer hasn’t written a bio yet",
    );
  });
});
