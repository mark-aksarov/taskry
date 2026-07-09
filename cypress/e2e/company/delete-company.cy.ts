import {
  users,
  accounts,
  companies,
  positions,
  workspaces,
} from "@/prisma/seed/test-data";

describe("delete company", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      users,
      accounts,
      positions,
      workspaces,
      companies: [
        ...companies,
        {
          id: 3,
          name: "Company 3",
          workspaceId: 1,
        },
      ],
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/companies");
  });

  it("can delete company", () => {
    cy.getByData("company-item-action-menu-trigger", "1").click();
    cy.getMenuItem("delete").click();

    cy.getByData("delete-company-modal")
      .should("be.visible")
      .contains("Company 1");

    cy.getByData("delete-company-modal-confirm-button").click();
    cy.getByData("company-list-item", "1").should("not.exist");
  });
});
