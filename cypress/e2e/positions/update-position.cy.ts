import {
  users,
  accounts,
  positions,
  workspaces,
  projectCategories,
} from "@/prisma/test-utils/data";

describe("Position updating", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      workspaces,
      positions,
      users,
      accounts,
      projectCategories,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/positions");
  });

  it("updates a position successfully", () => {
    cy.getByData("position-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.getByData("position-name-field").clear().type("Updated Position Name");
    cy.get('button[type="submit"]').click();

    cy.getByData("entity-grid").within(() => {
      cy.contains("Updated Position Name");
    });
  });

  it("pre-fills edit position form with default values", () => {
    cy.getByData("position-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.getByData("position-name-field").within(() =>
      cy.get("input").should("have.value", "Position 1"),
    );
  });

  it("shows validation errors and prevents submission with invalid data", () => {
    cy.getByData("position-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.getByData("position-name-field").clear();

    cy.get('button[type="submit"]').click();

    cy.contains(/name is required/i);
  });
});
