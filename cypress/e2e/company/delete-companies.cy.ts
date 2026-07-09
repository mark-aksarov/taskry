import {
  users,
  accounts,
  companies,
  positions,
  workspaces,
} from "@/prisma/seed/test-data";

describe("delete companies", () => {
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

  it("can delete companies", () => {
    cy.getByData("company-checkbox", "1").click();
    cy.getByData("company-checkbox", "3").click();

    cy.getByData("company-actions-menu-trigger").click();
    cy.getMenuItem("delete").click();

    cy.getByData("delete-companies-modal")
      .should("be.visible")
      .contains("2 companies");

    cy.getByData("delete-companies-modal-confirm-button").click();
    cy.getByData("company-list-item").should("not.exist");
  });
});
