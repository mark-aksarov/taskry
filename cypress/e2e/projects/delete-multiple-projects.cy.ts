import {
  users,
  tasks,
  accounts,
  projects,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/test-utils/data";

describe("delete multiple projects", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      users,
      accounts,
      positions,
      companies,
      customers,
      workspaces,
      taskCategories,
      projectCategories,
      tasks,
      projects,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/projects");
  });

  it("can delete projects", () => {
    cy.getByData("project-checkbox", "1").click();
    cy.getByData("project-checkbox", "2").click();

    cy.getByData("project-toolbar-actions-button-desktop")
      .filter(":visible")
      .click();
    cy.getMenuItem("delete").click();

    cy.getByData("delete-projects-modal")
      .should("be.visible")
      .contains("2 projects");

    cy.getByData("delete-projects-modal-confirm-button").click();
    cy.getByData("project-list-item").should("not.exist");
  });
});
