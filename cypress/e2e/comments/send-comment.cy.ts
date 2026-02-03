import { E2ESeedPayload } from "@/prisma/e2e/types";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

describe("send comments", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload: E2ESeedPayload = {
      companies: [{ id: 1, name: "Company 1", workspaceId: 1 }],
      customers: [
        {
          id: 1,
          email: "customer@example.com",
          fullName: "Larry Doe",
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
          assigneeId: "user-3",
          workspaceId: 1,
          creatorId: "user-1",
        },
      ],
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("owner@example.com", "12345abc");
  });

  it("send a comment to a task", () => {
    cy.visit("/en/tasks");

    cy.getByData("task-comments-modal-trigger").first().click();

    // fill form
    cy.get("[id=content]").type("This is a test comment.");

    // submit
    cy.get('button[type="submit"]').click();

    // verify comment appears
    cy.getByData("comment-item").contains("This is a test comment.");
  });

  it("send a comment to a project", () => {
    cy.visit("/en/projects");

    cy.getByData("project-comments-modal-trigger").first().click();

    // fill form
    cy.get("[id=content]").type("This is a test comment.");

    // submit
    cy.get('button[type="submit"]').click();

    // verify comment appears
    cy.getByData("comment-item").contains("This is a test comment.");
  });
});
