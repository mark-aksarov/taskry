import {
  users,
  accounts,
  positions,
  companies,
  customers,
  workspaces,
  projectCategories,
  taskCategories,
} from "@/prisma/seed/test-data";

import { ProjectStatus } from "@/generated/prisma/enums";

describe("update project statuses", () => {
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
      projects: [
        {
          id: 1,
          title: "Project 1",
          status: ProjectStatus.active,
          deadline: new Date("2030-01-01"),
          workspaceId: 1,
        },
        {
          id: 2,
          title: "Project 2",
          status: ProjectStatus.pending,
          deadline: new Date("2030-01-01"),
          workspaceId: 1,
        },
        {
          id: 3,
          title: "Project 3",
          status: ProjectStatus.completed,
          deadline: new Date("2030-01-01"),
          workspaceId: 1,
        },
        {
          id: 4,
          title: "Project 4",
          status: ProjectStatus.pending,
          deadline: new Date("2030-01-01"),
          workspaceId: 1,
        },
        {
          id: 5,
          title: "Project 5",
          status: ProjectStatus.completed,
          deadline: new Date("2030-01-01"),
          workspaceId: 1,
        },
        {
          id: 6,
          title: "Project 6",
          status: ProjectStatus.completed,
          deadline: new Date("2030-01-01"),
          workspaceId: 1,
        },
      ],
      tasks: [],
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/projects");
  });

  describe("should change status for all projects", () => {
    it("should change status for active task to pending", () => {
      cy.getByData("project-checkbox", "1").click();

      cy.getByData("project-actions-menu-trigger").click();
      cy.getMenuItem("pending").click();
      cy.getByData("project-list-item", "1").contains(/pending/i);
    });

    it("should change status for completed project to pending", () => {
      cy.getByData("project-checkbox", "3").click();

      cy.getByData("project-actions-menu-trigger").click();
      cy.getMenuItem("pending").click();
      cy.getByData("project-list-item", "3").contains(/pending/i);
    });

    it("should change status for active project to completed", () => {
      cy.getByData("project-checkbox", "1").click();

      cy.getByData("project-actions-menu-trigger").click();
      cy.getMenuItem("completed").click();
      cy.getByData("project-list-item", "1").contains(/completed/i);
    });

    it("should change status for active project + pending project to completed", () => {
      cy.getByData("project-checkbox", "1").click();
      cy.getByData("project-checkbox", "4").click();

      cy.getByData("project-actions-menu-trigger").click();
      cy.getMenuItem("completed").click();

      cy.getByData("project-list-item", "1").contains(/completed/i);
      cy.getByData("project-list-item", "4").contains(/completed/i);
    });

    it("should change status for pending + completed project to active", () => {
      cy.getByData("project-checkbox", "2").click();
      cy.getByData("project-checkbox", "3").click();

      cy.getByData("project-actions-menu-trigger").click();
      cy.getMenuItem("active").click();

      cy.getByData("project-list-item", "2").contains(/active/i);
      cy.getByData("project-list-item", "3").contains(/active/i);
    });

    it("should change status for active + completed projects + pending project to pending", () => {
      cy.getByData("project-checkbox", "1").click();
      cy.getByData("project-checkbox", "3").click();
      cy.getByData("project-checkbox", "4").click();

      cy.getByData("project-actions-menu-trigger").click();
      cy.getMenuItem("pending").click();

      cy.getByData("project-list-item", "1").contains(/pending/i);
      cy.getByData("project-list-item", "3").contains(/pending/i);
      cy.getByData("project-list-item", "4").contains(/pending/i);
    });

    it("should change status for active + completed projects + completed project to completed", () => {
      cy.getByData("project-checkbox", "1").click();
      cy.getByData("project-checkbox", "3").click();
      cy.getByData("project-checkbox", "5").click();

      cy.getByData("project-actions-menu-trigger").click();
      cy.getMenuItem("completed").click();

      cy.getByData("project-list-item", "1").contains(/completed/i);
      cy.getByData("project-list-item", "3").contains(/completed/i);
      cy.getByData("project-list-item", "5").contains(/completed/i);
    });

    it("should disable 'active' item when all selected projects are active", () => {
      cy.getByData("project-checkbox", "1").click();

      cy.getByData("project-actions-menu-trigger").click();
      cy.getMenuItem("active").should("have.attr", "aria-disabled", "true");
    });

    it("should disable 'pending' item when all selected projects are pending", () => {
      cy.getByData("project-checkbox", "2").click();
      cy.getByData("project-checkbox", "4").click();

      cy.getByData("project-actions-menu-trigger").click();
      cy.getMenuItem("pending").should("have.attr", "aria-disabled", "true");
    });

    it("should disable 'completed' item when all selected projects are pending", () => {
      cy.getByData("project-checkbox", "3").click();
      cy.getByData("project-checkbox", "5").click();
      cy.getByData("project-checkbox", "6").click();

      cy.getByData("project-actions-menu-trigger").click();
      cy.getMenuItem("completed").should("have.attr", "aria-disabled", "true");
    });
  });
});
