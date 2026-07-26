import {
  users,
  accounts,
  clients,
  positions,
  companies,
  organizations,
  members,
} from "@/prisma/seed/test-data";

describe("delete clients", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      users,
      accounts,
      positions,
      companies,
      clients,
      organizations,
      members,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/clients");
  });

  it("can delete clients", () => {
    cy.getByData("client-checkbox", "1").click();
    cy.getByData("client-checkbox", "2").click();

    cy.getByData("client-actions-menu-trigger").filter(":visible").click();
    cy.getMenuItem("delete").click();

    cy.getByData("delete-clients-modal")
      .should("be.visible")
      .contains("2 clients");

    cy.getByData("delete-clients-modal-confirm-button").click();
    cy.getByData("client-list-item").should("not.exist");
  });
});
