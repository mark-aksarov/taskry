import {
  users,
  tasks,
  comments,
  projects,
  accounts,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/test-utils/data";

describe("update a comment", () => {
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

  it("can update a project comment", () => {
    cy.visit("/en/projects");
    cy.getByData("project-1-comments-modal-trigger").click();

    // click on the edit menu item
    cy.getByData("comment-item-1-action-menu-trigger").click();
    cy.getMenuItem("edit").click();

    // update the comment
    cy.getByData("comment-text-field-textarea")
      .should("have.value", "Comment 1")
      .clear()
      .type("Updated Comment 1");

    cy.getByData("comment-text-field-send-button").click();
    cy.getByData("comment-item").contains("Updated Comment 1");
  });

  it("can update a task comment", () => {
    cy.visit("/en/tasks");
    cy.getByData("task-1-comments-modal-trigger").click();

    // click on the edit menu item
    cy.getByData("comment-item-3-action-menu-trigger").click();
    cy.getMenuItem("edit").click();

    // update the comment
    cy.getByData("comment-text-field-textarea")
      .should("have.value", "Comment 3")
      .clear()
      .type("Updated Comment 3");

    cy.getByData("comment-text-field-send-button").click();
    cy.getByData("comment-item").contains("Updated Comment 3");
  });

  it("cannot edit a project comment if user has user role and he is not sender", () => {
    cy.signIn("user-2@test.com", "12345abc");
    cy.visit("/en/projects");
    cy.getByData("project-1-comments-modal-trigger").click();
    cy.getByData("comment-item-1-action-menu-trigger").should("not.exist");
  });

  it("can edit a project comment if user has user role and he is sender", () => {
    cy.signIn("user-2@test.com", "12345abc");
    cy.visit("/en/tasks");
    cy.getByData("task-1-comments-modal-trigger").click();
    cy.getByData("comment-item-2-action-menu-trigger").should("not.exist");
  });

  it("cannot delete a comment in guest mode", () => {
    cy.signIn("user-3@test.com", "12345abc");
    cy.visit("/en/projects");
    cy.getByData("project-1-comments-modal-trigger").click();
    cy.getByData("comment-item-1-action-menu-trigger").click();
    cy.getMenuItem("edit").click();
    cy.getByData("guest-mode-modal").should("be.visible");
  });
});
