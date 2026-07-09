import { ProjectStatus } from "@/generated/prisma/enums";
import {
  users,
  projects,
  accounts,
  positions,
  companies,
  customers,
  workspaces,
  projectCategories,
  taskCategories,
} from "@/prisma/seed/test-data";

describe("update project status", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      users,
      tasks: [],
      projects: [
        {
          id: 1,
          title: "Project 1",
          deadline: new Date("2030-12-31"),
          workspaceId: 1,
          status: ProjectStatus.active,
        },
        {
          id: 2,
          title: "Project 2",
          deadline: new Date("2030-12-30"),
          workspaceId: 1,
          status: ProjectStatus.pending,
        },
      ],
      accounts,
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
    cy.visit("/en/projects");
  });

  describe("can update project status", () => {
    it("should update 'active' project status to 'pending'", () => {
      cy.getByData("project-item-action-menu-trigger", "1").click();
      cy.getMenuItem("pending").click();
      cy.getByData("project-list-item", "1").contains(/pending/i);
    });

    it("should update 'active' project status to 'completed'", () => {
      cy.getByData("project-item-action-menu-trigger", "1").click();
      cy.getMenuItem("completed").click();
      cy.getByData("project-list-item", "1").contains(/completed/i);
    });

    it("should update 'pending' project status to 'active'", () => {
      cy.getByData("project-item-action-menu-trigger", "2").click();
      cy.getMenuItem("active").click();
      cy.getByData("project-list-item", "2").contains(/active/i);
    });
  });
});
