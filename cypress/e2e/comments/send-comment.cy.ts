import {
  users,
  tasks,
  projects,
  accounts,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/test-utils/data";

describe("send comments", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      workspaces,
      positions,
      users,
      accounts,
      companies,
      customers,
      projectCategories,
      taskCategories,
      projects,
      tasks,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
  });

  it("send a comment to a task", () => {
    cy.visit("/en/tasks");

    cy.getByData("task-comments-modal-trigger", "1").click();

    // fill form
    cy.get("[id=content]").type("This is a test comment.");

    // submit
    cy.get('button[type="submit"]').click();

    // verify comment appears
    cy.getByData("comment-item").contains("This is a test comment.");
  });

  it("send a comment to a project", () => {
    cy.visit("/en/projects");

    cy.getByData("project-comments-modal-trigger", "1").click();

    // fill form
    cy.get("[id=content]").type("This is a test comment.");

    // submit
    cy.get('button[type="submit"]').click();

    // verify comment appears
    cy.getByData("comment-item").contains("This is a test comment.");
  });
});
