import {
  users,
  tasks,
  projects,
  comments,
  accounts,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/test-utils/data";

describe("deletes a comment", () => {
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
      projects: [projects[0]],
      tasks: [tasks[0]],
      comments: [comments[0], comments[2]],
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
  });

  it("can delete a project comment", () => {
    cy.visit("/en/projects");
    cy.getByData("project-1-comments-modal-trigger").click();
    cy.getByData("comment-item-1-action-menu-trigger").click();
    cy.getMenuItem("delete").click();
    cy.getByData("delete-comment-modal-confirm-button").click();
    cy.getByData("comment-item").should("not.exist");
  });

  it("can delete a task comment", () => {
    cy.visit("/en/tasks");
    cy.getByData("task-1-comments-modal-trigger").click();
    cy.getByData("comment-item-3-action-menu-trigger").click();
    cy.getMenuItem("delete").click();
    cy.getByData("delete-comment-modal-confirm-button").click();
    cy.getByData("comment-item").should("not.exist");
  });

  it("cannot delete a project comment if user has user role and he is not sender", () => {
    cy.signIn("user-2@test.com", "12345abc");
    cy.visit("/en/projects");
    cy.getByData("project-1-comments-modal-trigger").click();
    cy.getByData("comment-item-1-action-menu-trigger").should("not.exist");
  });

  it("cannot delete a comment in guest mode", () => {
    cy.signIn("user-3@test.com", "12345abc");
    cy.visit("/en/projects");
    cy.getByData("project-1-comments-modal-trigger").click();
    cy.getByData("comment-item-1-action-menu-trigger").click();
    cy.getMenuItem("delete").click();
    cy.getByData("guest-mode-modal").should("be.visible");
  });
});
