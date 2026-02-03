import { E2ESeedPayload } from "@/prisma/e2e/types";

describe("modals smoke tests", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload: E2ESeedPayload = {
      companies: [
        {
          id: 1,
          name: "Company 1",
          workspaceId: 1,
        },
      ],
      customers: [
        {
          id: 1,
          email: "owner@example.com",
          fullName: "John Doe",
          companyId: 1,
          workspaceId: 1,
        },
      ],
      projectCategories: [
        {
          id: 1,
          name: "Category 1",
          workspaceId: 1,
        },
      ],
      projects: [
        {
          id: 1,
          title: "Project 1",
          status: "active",
          deadline: new Date("2022-01-01"),
          categoryId: 1,
          customerId: 1,
          workspaceId: 1,
          creatorId: "user-1",
        },
      ],
      taskCategories: [
        {
          id: 1,
          name: "Category 1",
          workspaceId: 1,
        },
      ],
      tasks: [
        {
          id: 1,
          title: "Task 1",
          status: "active",
          deadline: new Date("2022-01-01"),
          categoryId: 1,
          projectId: 1,
          workspaceId: 1,
          creatorId: "user-1",
          assigneeId: "user-1",
        },
      ],
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("owner@example.com", "12345abc");
  });

  it("should open filter modals", () => {
    cy.visit("/en/projects");
    cy.getByData("project-toolbar-filters-button-desktop")
      .filter(":visible")
      .click();
    cy.getByData("project-toolbar-filters-modal").should("be.visible");
    cy.get("[id=project-filter-form]").should("exist");

    cy.visit("/en/tasks");
    cy.getByData("task-toolbar-filters-button-desktop")
      .filter(":visible")
      .click();
    cy.getByData("task-toolbar-filters-modal").should("be.visible");
    cy.get("[id=task-filter-form]").should("exist");

    cy.visit("/en/customers");
    cy.getByData("customer-toolbar-filters-button-desktop")
      .filter(":visible")
      .click();
    cy.getByData("customer-toolbar-filters-modal").should("be.visible");
    cy.get("[id=customer-filter-form]").should("exist");

    cy.visit("/en/team");
    cy.getByData("user-toolbar-filters-button-desktop")
      .filter(":visible")
      .click();
    cy.getByData("user-toolbar-filters-modal").should("be.visible");
    cy.get("[id=user-filter-form]").should("exist");
  });

  it("should open creation modals for main entities", () => {
    cy.visit("/en/projects");

    cy.getByData("project-toolbar-create-new-menu-trigger")
      .filter(":visible")
      .click();

    cy.getMenuItem("project").click();

    cy.getByData("new-project-modal").should("be.visible");
    cy.get("[id=new-project-form]").should("exist");

    cy.visit("/en/tasks");

    cy.getByData("task-toolbar-create-new-menu-trigger")
      .filter(":visible")
      .click();

    cy.getMenuItem("task").click();

    cy.getByData("new-task-modal").should("be.visible");
    cy.get("[id=new-task-form]").should("exist");

    cy.visit("/en/customers");

    cy.getByData("customer-toolbar-create-new-menu-trigger")
      .filter(":visible")
      .click();

    cy.getMenuItem("customer").click();

    cy.getByData("new-customer-modal").should("be.visible");
    cy.get("[id=new-customer-form]").should("exist");
  });

  it("should open edition modals for main entities", () => {
    cy.visit("/en/projects");

    cy.getByData("project-item-1-action-menu-trigger").click();
    cy.getMenuItem("edit").click();
    cy.getByData("edit-project-modal").should("be.visible");
    cy.get("[id=edit-project-form]").should("exist");

    cy.visit("/en/tasks");
    cy.getByData("task-item-1-action-menu-trigger").click();
    cy.getMenuItem("edit").click();
    cy.getByData("edit-task-modal").should("be.visible");
    cy.get("[id=edit-task-form]").should("exist");

    cy.visit("/en/customers");
    cy.getByData("customer-item-1-action-menu-trigger").click();
    cy.getMenuItem("edit").click();
    cy.getByData("edit-customer-modal").should("be.visible");
    cy.get("[id=edit-customer-form]").should("exist");
  });
});
