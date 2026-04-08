import {
  users,
  projects,
  accounts,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/test-utils/data";

describe("Task creation", () => {
  const taskData = {
    title: "Created Task Title",
    description: "Created Task Description",
    deadline: {
      day: "01",
      month: "01",
      year: "2030",
    },
    statusKey: "active",
    categoryKey: "1",
    projectKey: "1",
    assigneeKey: "user-1",
  };

  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      workspaces,
      users,
      accounts,
      positions,
      companies,
      customers,
      projectCategories,
      taskCategories,
      projects,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/tasks");
  });

  it("creates a new task with valid data", () => {
    cy.getByData("tasks-empty-section-create-button").click();

    cy.fillTaskForm(taskData);

    // Submit
    cy.get('button[type="submit"]').click();

    cy.getByData("tasks-list").within(() => {
      cy.contains(taskData.title);
      cy.contains(taskData.deadline.year);
      cy.contains(/active/i);
      cy.contains("Project 1");
      cy.contains("Task Category 1");
      cy.contains("User 1");
    });
  });

  it("shows validation errors and prevents submission with invalid data", () => {
    cy.getByData("tasks-empty-section-create-button").click();

    cy.get('button[type="submit"]').click();

    cy.contains(/title is required/i);
    cy.contains(/deadline is required/i);
  });

  it("creates a task when optional fields are empty", () => {
    cy.getByData("tasks-empty-section-create-button").click();

    cy.fillTaskForm({
      title: taskData.title,
      deadline: taskData.deadline,
      statusKey: taskData.statusKey,
      projectKey: taskData.projectKey,
    });

    cy.get('button[type="submit"]').click();

    cy.getByData("tasks-list").within(() => {
      cy.contains(taskData.title);
      cy.contains(taskData.deadline.year);
      cy.contains(/active/i);
      cy.contains("Project 1");
      cy.contains("No category");
      cy.contains("No assignee");
    });
  });
});
