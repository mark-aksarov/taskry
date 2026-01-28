import { E2ESeedPayload } from "@/prisma/e2e/types";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

describe("update a comment", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload: E2ESeedPayload = {
      companies: [{ id: 1, name: "Company 1", workspaceId: 1 }],
      customers: [
        {
          id: 1,
          email: "customer@example.com",
          fullName: "John Doe",
          companyId: 1,
          workspaceId: 1,
        },
      ],
      projectCategories: [{ id: 1, name: "Category 1", workspaceId: 1 }],
      taskCategories: [{ id: 1, name: "Category 1", workspaceId: 1 }],
      projects: [
        {
          id: 1,
          title: "Project 1",
          status: ProjectStatus.active,
          deadline: new Date("2022-01-01"),
          categoryId: 1,
          customerId: 1,
          workspaceId: 1,
          creatorId: "user-1",
        },
      ],
      tasks: [
        {
          id: 1,
          title: "Task 1",
          status: TaskStatus.active,
          deadline: new Date("2022-01-01"),
          categoryId: 1,
          projectId: 1,
          workspaceId: 1,
          creatorId: "user-1",
          assigneeId: "user-1",
        },
      ],
      comments: [
        {
          id: 1,
          content: "Comment 1",
          projectId: 1,
          workspaceId: 1,
          senderId: "user-1",
        },
        {
          id: 2,
          content: "Comment 2",
          taskId: 1,
          workspaceId: 1,
          senderId: "user-2",
        },
      ],
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("owner@example.com", "12345abc");
  });

  it("can update a project comment", () => {
    cy.visit("/en/projects");
    cy.getByData("project-comments-modal-trigger").click();

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
    cy.getByData("task-comments-modal-trigger").click();

    // click on the edit menu item
    cy.getByData("comment-item-2-action-menu-trigger").click();
    cy.getMenuItem("edit").click();

    // update the comment
    cy.getByData("comment-text-field-textarea")
      .should("have.value", "Comment 2")
      .clear()
      .type("Updated Comment 2");

    cy.getByData("comment-text-field-send-button").click();
    cy.getByData("comment-item").contains("Updated Comment 2");
  });

  it("cannot edit a project comment if user has user role and he is not sender", () => {
    cy.signIn("user@example.com", "12345abc");
    cy.visit("/en/projects");
    cy.getByData("project-comments-modal-trigger").click();
    cy.getByData("comment-item-1-action-menu-trigger").should("not.exist");
  });

  it("can edit a project comment if user has user role and he is sender", () => {
    cy.signIn("user@example.com", "12345abc");
    cy.visit("/en/tasks");
    cy.getByData("task-comments-modal-trigger").click();
    cy.getByData("comment-item-2-action-menu-trigger").should("not.exist");
  });

  it("cannot delete a comment in guest mode", () => {
    cy.signIn("guest@example.com", "12345abc");
    cy.visit("/en/projects");
    cy.getByData("project-comments-modal-trigger").click();
    cy.getByData("comment-item-1-action-menu-trigger").click();
    cy.getMenuItem("edit").click();
    cy.getByData("guest-mode-modal").should("be.visible");
  });
});
