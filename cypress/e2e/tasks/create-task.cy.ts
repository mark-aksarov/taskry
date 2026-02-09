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

describe("creates a new task", () => {
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

  it("can create a task", () => {
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
  });
});
