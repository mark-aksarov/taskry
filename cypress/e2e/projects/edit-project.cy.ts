import { E2ESeedPayload } from "@/prisma/e2e/types";
import { ProjectStatus } from "@/generated/prisma/enums";

describe("edit a new project", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload: E2ESeedPayload = {
      companies: [
        { id: 1, name: "Company 1", workspaceId: 1 },
        { id: 2, name: "Company 2", workspaceId: 1 },
      ],
      customers: [
        {
          id: 1,
          email: "customer-1@example.com",
          fullName: "Kevin Hamilton",
          companyId: 1,
          workspaceId: 1,
        },
        {
          id: 2,
          email: "customer-2@example.com",
          fullName: "Larry Doe",
          companyId: 2,
          workspaceId: 1,
        },
      ],
      projectCategories: [
        { id: 1, name: "Category 1", workspaceId: 1 },
        { id: 2, name: "Category 2", workspaceId: 1 },
      ],
      taskCategories: [{ id: 1, name: "Category 1", workspaceId: 1 }],
      projects: [
        {
          id: 1,
          title: "Project 1",
          status: ProjectStatus.active,
          deadline: new Date("2022-01-01"),
          categoryId: 1,
          customerId: 1,
          workspaceId: 1,
          creatorId: "user-1",
        },
      ],
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("owner@example.com", "12345abc");
    cy.visit("/en/projects");
  });

  it("can edit a task", () => {
    cy.getMenuItem("project-item-1-action-menu-trigger", "edit").click();

    // fill form
    cy.get('input[name="title"]').clear().type("Updated Project Title");
    cy.get('textarea[name="description"]')
      .clear()
      .type("Updated Project Description");
    cy.setDatePickerDate("deadline-date-picker", "12", "31", "2025");
    cy.changeSelection("status-select", "pending");
    cy.changeSelection("category-select", "2");
    cy.changeSelection("customer-select", "2");

    // submit
    cy.get('button[type="submit"]').click();

    // assert
    cy.getByData("project-list-item").within(() => {
      cy.contains("Updated Project Title");
      cy.contains("Category 2");
      cy.contains("Larry Doe");
      cy.contains("Company 2");
      cy.contains("Pending");
    });
  });
});
