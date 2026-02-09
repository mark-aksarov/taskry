import {
  users,
  accounts,
  positions,
  companies,
  customers,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/test-utils/data";

describe("creates a new project", () => {
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
      taskCategories,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/projects");
  });

  it("can create a project", () => {
    cy.getByData("projects-page-empty-add-button").click();

    // fill form
    cy.get('input[name="title"]').clear().type("Created Project Title");
    cy.get('textarea[name="description"]')
      .clear()
      .type("Created Project Description");
    cy.setDatePickerDate("deadline-date-picker", "12", "31", "2025");

    cy.getByData("status-select").click();
    cy.getSelectOption("active").click();

    cy.getByData("category-select").click();
    cy.getSelectOption("1").click();

    cy.getByData("customer-select").click();
    cy.getSelectOption("1").click();

    // submit
    cy.get('button[type="submit"]').click();

    // assert
    cy.getByData("project-list-item").within(() => {
      cy.contains("Created Project Title");
      cy.contains("Category 1");
      cy.contains("Customer 1");
      cy.contains("Company 1");
      cy.contains("Active");
    });
  });
});
