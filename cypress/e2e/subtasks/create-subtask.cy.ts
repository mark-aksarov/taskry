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

describe("Subtask creation", () => {
  beforeEach(() => {
    cy.viewport(414, 896);

    const payload = {
      users,
      tasks,
      accounts,
      projects,
      positions,
      companies,
      customers,
      workspaces,
      taskCategories,
      projectCategories,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/tasks/1");
  });

  it("creates a new subtask with valid data", () => {
    cy.getByData("create-subtask-button").filter(":visible").click();

    cy.getByData("subtask-text-field").type("Created Subtask Title");

    // Submit
    cy.get('button[type="submit"]').click();

    cy.getByData("subtask-list")
      .filter(":visible")
      .within(() => {
        cy.contains("Created Subtask Title");
      });
  });

  it("shows validation errors and prevents submission with invalid data", () => {
    cy.getByData("create-subtask-button").filter(":visible").click();

    cy.get('button[type="submit"]').click();

    cy.contains(/subtask text is required/i);
  });
});
