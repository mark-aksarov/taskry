import {
  users,
  tasks,
  accounts,
  projects,
  customers,
  positions,
  companies,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/test-utils/data";

describe("dashboard cards", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      workspaces,
      positions,
      users,
      accounts,
      companies,
      customers,
      projectCategories,
      projects,
      taskCategories,
      tasks,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/dashboard");
  });

  it("Displays correct dashboard cards", () => {
    cy.getByData("dashboard-card-text")
      .eq(0)
      .should("contain", "Total projects");
    cy.getByData("dashboard-card-value").eq(0).should("contain", "2");

    cy.getByData("dashboard-card-text").eq(1).should("contain", "Total tasks");
    cy.getByData("dashboard-card-value").eq(1).should("contain", "2");

    cy.getByData("dashboard-card-text").eq(2).should("contain", "Total users");
    cy.getByData("dashboard-card-value").eq(2).should("contain", "3");

    cy.getByData("dashboard-card-text")
      .eq(3)
      .should("contain", "Total customers");
    cy.getByData("dashboard-card-value").eq(3).should("contain", "2");
  });
});
