import {
  users,
  tasks,
  projects,
  accounts,
  positions,
  companies,
  customers,
  workspaces,
  projectCategories,
} from "@/prisma/test-utils/data";

describe("Task editing", () => {
  beforeEach(() => {
    const payload = {
      workspaces,
      users,
      accounts,
      positions,
      companies,
      customers,
      projectCategories,
      taskCategories: [
        { id: 1, name: "Task Category 1", workspaceId: 1 },
        { id: 2, name: "Task Category 2", workspaceId: 1 },
      ],
      projects,
      tasks,
    };

    cy.viewport(1440, 900);
    cy.task("db:reset");
    cy.task("db:seed", payload);
  });

  it("updates a task successfully", () => {
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/tasks");

    cy.getByData("task-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.fillTaskForm({
      title: "Updated Task Title",
      description: "Updated Task Description",
      deadline: { day: "01", month: "02", year: "2026" },
      statusKey: "pending",
      categoryKey: "2",
      projectKey: "2",
      assigneeKey: "user-2",
    });

    cy.get('button[type="submit"]').click();

    cy.getByData("task-list-item", "1").within(() => {
      cy.contains("Updated Task Title");
      cy.contains("Category 2");
      cy.contains("Project 2");
      cy.contains("Pending");
    });
  });

  it("pre-fills task form with default values", () => {
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/tasks");

    cy.getByData("task-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.get("input[name=title]").should("have.value", "Task 1");
    cy.get("textarea[name=description]").should("have.value", "Description 1");
    cy.get("input[name=deadline]").should("have.value", "2025-12-31");
    cy.get("select[name=status]").should("have.value", "active");
    cy.get("select[name=categoryId]").should("have.value", "1");
    cy.get("select[name=projectId]").should("have.value", "1");
    cy.get("select[name=assigneeId]").should("have.value", "user-1");
  });
});
