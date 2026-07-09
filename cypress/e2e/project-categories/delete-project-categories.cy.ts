import {
  users,
  accounts,
  positions,
  workspaces,
} from "@/prisma/seed/test-data";

describe("delete project categories", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      users,
      accounts,
      positions,
      workspaces,
      projectCategories: [
        { id: 1, name: "Project Category 1", workspaceId: 1 },
        { id: 2, name: "Project Category 2", workspaceId: 1 },
      ],
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/project-categories");
  });

  it("can delete project categories", () => {
    cy.getByData("project-category-checkbox", "1").click();
    cy.getByData("project-category-checkbox", "2").click();

    cy.getByData("project-category-actions-menu-trigger")
      .filter(":visible")
      .click();
    cy.getMenuItem("delete").click();

    cy.getByData("delete-project-categories-modal")
      .should("be.visible")
      .contains("2 project categories");

    cy.getByData("delete-project-categories-modal-confirm-button").click();
    cy.getByData("project-category-list-item").should("not.exist");
  });
});
