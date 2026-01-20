import { E2ESeedPayload } from "@/prisma/e2e/types";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

describe("deletes a comment", () => {
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
          senderId: "user-1",
        },
      ],
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("owner@example.com", "12345abc");
  });

  it("can delete a project comment", () => {
    cy.visit("/en/projects");
    cy.getByData("project-comments-modal-trigger").click();
    cy.getMenuItem("comment-item-1-action-menu-trigger", "delete").click();
    cy.getByData("confirm-button").click();
    cy.getByData("comment-item").should("not.exist");
  });

  it("can delete a task comment", () => {
    cy.visit("/en/tasks");
    cy.getByData("task-comments-modal-trigger").click();
    cy.getMenuItem("comment-item-2-action-menu-trigger", "delete").click();
    cy.getByData("confirm-button").click();
    cy.getByData("comment-item").should("not.exist");
  });

  it("cannot delete a comment in guest mode", () => {
    cy.signIn("guest@example.com", "12345abc");
    cy.visit("/en/projects");
    cy.getByData("project-comments-modal-trigger").click();
    cy.getMenuItem("comment-item-1-action-menu-trigger", "delete").click();
    cy.getByData("guest-mode-modal").should("be.visible");
  });
});
