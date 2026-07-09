import {
  users,
  accounts,
  positions,
  companies,
  customers,
  workspaces,
} from "@/prisma/seed/test-data";

describe("deletes a customer", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      users,
      accounts,
      positions,
      companies,
      customers,
      workspaces,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
  });

  it("can delete a customer", () => {
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/customers");

    cy.getByData("customer-item-action-menu-trigger", "1").click();
    cy.getMenuItem("delete").click();
    cy.getByData("delete-customer-modal-confirm-button").click();
    cy.getByData("customer-list-item", "1").should("not.exist");
  });
});
