import {
  users,
  accounts,
  companies,
  positions,
  workspaces,
  projectCategories,
} from "@/prisma/test-utils/data";

describe("Company editing", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      workspaces,
      companies,
      positions,
      users,
      accounts,
      projectCategories,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/companies");
  });

  it("updates a company successfully", () => {
    cy.getByData("company-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.getByData("company-name-field").clear().type("Updated Company Name");
    cy.get('button[type="submit"]').click();

    cy.getByData("company-list").within(() => {
      cy.contains("Updated Company Name");
    });
  });

  it("pre-fills edit company form with default values", () => {
    cy.getByData("company-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.getByData("company-name-field").within(() =>
      cy.get("input").should("have.value", "Company 1"),
    );
  });

  it("shows validation errors and prevents submission with invalid data", () => {
    cy.getByData("company-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.getByData("company-name-field").clear();

    cy.get('button[type="submit"]').click();

    cy.contains(/name is required/i);
  });
});
