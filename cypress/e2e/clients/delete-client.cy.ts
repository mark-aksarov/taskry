import {
  users,
  accounts,
  positions,
  companies,
  clients,
  organizations,
  members,
} from "@/prisma/seed/test-data";

describe("deletes a client", () => {
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
  });

  it("can delete a client", () => {
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/clients");

    cy.getByData("client-item-action-menu-trigger", "1").click();
    cy.getMenuItem("delete").click();
    cy.getByData("delete-client-modal-confirm-button").click();
    cy.getByData("client-list-item", "1").should("not.exist");
  });
});
