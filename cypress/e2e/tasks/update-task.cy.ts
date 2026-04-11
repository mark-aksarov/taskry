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
import { TaskStatus } from "@/generated/prisma/enums";

describe("Task updating", () => {
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
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/tasks");
  });

  it("updates a task successfully", () => {
    cy.getByData("task-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.fillTaskForm({
      title: "Updated Task Title",
      description: "Updated Task Description",
      deadline: {
        day: "01",
        month: "01",
        year: "2030",
      },
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
    cy.getByData("task-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.getByData("task-title-field").within(() =>
      cy.get("input").should("have.value", "Task 1"),
    );
    cy.getByData("task-description-field").within(() =>
      cy.get("textarea").should("have.value", "Description 1"),
    );
    cy.getByData("task-deadline-date-picker").within(() =>
      cy.get("input").should("have.value", "2030-12-31"),
    );
    cy.getByData("task-status-select").within(() =>
      cy.get("select").should("have.value", "active"),
    );
    cy.getByData("task-category-select").within(() =>
      cy.get("select").should("have.value", "1"),
    );
    cy.getByData("project-select").within(() =>
      cy.get("select").should("have.value", "1"),
    );
    cy.getByData("user-select").within(() =>
      cy.get("select").should("have.value", "user-1"),
    );
  });

  it("updates a task when optional fields are empty", () => {
    cy.getByData("task-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.fillTaskForm({
      title: "Updated Task Title",
      deadline: { day: "01", month: "02", year: "2030" },
      statusKey: TaskStatus.active,
      projectKey: "",
      categoryKey: "",
      assigneeKey: "",
    });

    cy.getByData("task-description-field").clear();

    cy.getByData("project-select").click();
    cy.getSelectOption("").click();

    cy.getByData("task-category-select").click();
    cy.getSelectOption("").click();

    cy.getByData("user-select").click();
    cy.getSelectOption("").click();

    cy.get('button[type="submit"]').click();

    cy.getByData("task-list-item", "1").within(() => {
      cy.contains("Task 1");
      cy.contains("2030");
      cy.contains(/active/i);
      cy.contains("No project");
      cy.contains("No category");
      cy.contains("No assignee");
    });
  });
});
