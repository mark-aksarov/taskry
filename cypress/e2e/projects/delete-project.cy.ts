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

describe("deletes a project", () => {
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
      projects: projects.slice(0, 1),
      tasks: tasks.slice(0, 2),
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
  });

  it("can delete a project", () => {
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/projects");

    cy.getByData("project-item-action-menu-trigger", "1").click();
    cy.getMenuItem("delete").click();
    cy.getByData("delete-project-modal-confirm-button").click();
    cy.getByData("project-list-item").should("not.exist");
  });
});
