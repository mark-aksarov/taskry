import {
  users,
  accounts,
  positions,
  workspaces,
} from "@/prisma/seed/test-data";

describe("delete project category", () => {
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

  it("can delete project category", () => {
    cy.getByData("project-category-item-action-menu-trigger", "1").click();
    cy.getMenuItem("delete").click();

    cy.getByData("delete-project-category-modal")
      .should("be.visible")
      .contains("Project Category 1");

    cy.getByData("delete-project-category-modal-confirm-button").click();
    cy.getByData("project-category-list-item", "1").should("not.exist");
  });
});
