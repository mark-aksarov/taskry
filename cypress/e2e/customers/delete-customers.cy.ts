import {
  users,
  accounts,
  customers,
  positions,
  companies,
  workspaces,
} from "@/prisma/test-utils/data";

describe("delete customers", () => {
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
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/customers");
  });

  it("can delete customers", () => {
    cy.getByData("customer-checkbox", "1").click();
    cy.getByData("customer-checkbox", "2").click();

    cy.getByData("customer-actions-menu-trigger").filter(":visible").click();
    cy.getMenuItem("delete").click();

    cy.getByData("delete-customers-modal")
      .should("be.visible")
      .contains("2 customers");

    cy.getByData("delete-customers-modal-confirm-button").click();
    cy.getByData("customer-list-item").should("not.exist");
  });
});
