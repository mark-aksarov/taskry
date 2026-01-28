import { E2ESeedPayload } from "@/prisma/e2e/types";
import { ProjectStatus } from "@/generated/prisma/enums";

describe("creates a new task", () => {
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
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("owner@example.com", "12345abc");
    cy.visit("/en/tasks");
  });

  it("can create a task and send notifications", () => {
    cy.getByData("tasks-page-empty-add-button").click();

    // fill form
    cy.get('input[name="title"]').clear().type("Created Task Title");
    cy.get('textarea[name="description"]')
      .clear()
      .type("Updated Task Description");
    cy.setDatePickerDate("deadline-date-picker", "12", "31", "2025");

    cy.getByData("status-select").click();
    cy.getSelectOption("active").click();

    cy.getByData("category-select").click();
    cy.getSelectOption("1").click();

    cy.getByData("project-select").click();
    cy.getSelectOption("1").click();

    cy.getByData("assignee-select").click();
    cy.getSelectOption("user-3").click();

    // submit
    cy.get('button[type="submit"]').click();

    // assert
    cy.getByData("task-list-item").within(() => {
      cy.contains("Created Task Title");
      cy.contains("Category 1");
      cy.contains("Project 1");
      cy.contains("Active");
    });

    // check notifications
    cy.checkNotifications(0);

    // sign in as user-2
    cy.signIn("user@example.com", "12345abc");
    cy.visit("/en/tasks");

    // check notifications
    cy.checkNotifications(1, [
      {
        target: "Created Task Title",
        actor: "John Doe",
        action: "added a new task",
      },
    ]);

    // sign in as user-3
    cy.signIn("guest@example.com", "12345abc");
    cy.visit("/en/tasks");

    // check notifications
    cy.checkNotifications(1, [
      {
        target: "Created Task Title",
        actor: "John Doe",
        action: "added a new task",
      },
    ]);
  });
});
