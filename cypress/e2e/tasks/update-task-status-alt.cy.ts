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

describe("Task status updating", () => {
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

  it("updates a task status successfully", () => {
    cy.getByData("update-task-status-edit-button").filter(":visible").click();
    cy.getByData("task-status-select").within(() =>
      cy.get("select").should("have.value", "active"),
    );
    cy.getByData("task-status-select").click();
    cy.getSelectOption("pending").click();
    cy.get('button[type="submit"]').click();
    cy.getByData("task-status-detail-info").contains(/pending/i);
  });
});
