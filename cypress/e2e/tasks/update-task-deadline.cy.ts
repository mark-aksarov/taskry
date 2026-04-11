import {
  users,
  tasks,
  projects,
  accounts,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/test-utils/data";

describe("Task deadline updating", () => {
  beforeEach(() => {
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
      tasks,
    };

    cy.viewport(414, 896);
    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/tasks/1");
  });

  it("updates a task deadline successfully", () => {
    cy.getByData("update-task-deadline-edit-button").filter(":visible").click();
    cy.setDatePickerDate("task-deadline-date-picker", "01", "02", "1234");
    cy.get('button[type="submit"]').click();
    cy.getByData("task-deadline-detail-info").contains("1234");
  });

  it("shows validation error and prevents submission with empty deadline", () => {
    cy.getByData("update-task-deadline-edit-button").filter(":visible").click();
    cy.setDatePickerDate("task-deadline-date-picker", "", "", "");
    cy.get('button[type="submit"]').click();
    cy.contains(/deadline is required/i);
  });
});
