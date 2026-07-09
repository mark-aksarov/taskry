import { TestSeedPayload } from "@/prisma/test-seed";
import { accounts, workspaces } from "@/prisma/seed/test-data";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

describe("filter customers", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload: TestSeedPayload = {
      accounts: [accounts[0]],
      positions: [
        { id: 1, name: "Position 1", workspaceId: 1 },
        { id: 2, name: "Position 2", workspaceId: 1 },
      ],
      users: [
        {
          id: "user-1",
          fullName: "User 1",
          email: "user-1@test.com",
          emailVerified: true,
          role: "owner",
          positionId: 1,
          workspaceId: 1,
        },
        {
          id: "user-2",
          fullName: "User 2",
          email: "user-2@test.com",
          emailVerified: true,
          role: "user",
          positionId: 1,
          workspaceId: 1,
        },
        {
          id: "user-3",
          fullName: "User 3",
          email: "user-3@test.com",
          emailVerified: true,
          role: "user",
          positionId: 2,
          workspaceId: 1,
        },
      ],
      projects: [
        {
          id: 1,
          title: "Project A",
          deadline: new Date("2030-01-01"),
          status: ProjectStatus.active,
          workspaceId: 1,
        },
      ],
      tasks: [
        {
          id: 1,
          title: "Task A",
          deadline: new Date("2030-01-01"),
          status: TaskStatus.active,
          assigneeId: "user-1",
          projectId: 1,
          workspaceId: 1,
        },
        {
          id: 2,
          title: "Task B",
          deadline: new Date("2030-01-01"),
          status: TaskStatus.pending,
          assigneeId: "user-2",
          projectId: 1,
          workspaceId: 1,
        },
        {
          id: 3,
          title: "Task C",
          deadline: new Date("2022-01-01"),
          status: TaskStatus.active,
          assigneeId: "user-3",
          projectId: 1,
          workspaceId: 1,
        },
      ],
      workspaces,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/team");
  });

  it("filter users with no active tasks", () => {
    cy.getByData("user-filters-modal-trigger-large").click();

    cy.getByData("has-no-active-tasks-switch").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("user-list-item").should("have.length", 1);
    cy.getByData("user-list-item", "user-2").should("exist");

    cy.location("search").should("include", "hasNoActiveTasks=true");
  });

  it("filter users with active tasks", () => {
    cy.getByData("user-filters-modal-trigger-large").click();

    cy.getByData("has-active-tasks-switch").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("user-list-item").should("have.length", 2);
    cy.getByData("user-list-item", "user-1").should("exist");
    cy.getByData("user-list-item", "user-3").should("exist");

    cy.location("search").should("include", "hasActiveTasks=true");
  });

  it("filter users with overdue tasks", () => {
    cy.getByData("user-filters-modal-trigger-large").click();

    cy.getByData("has-overdue-tasks-switch").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("user-list-item").should("have.length", 1);
    cy.getByData("user-list-item", "user-3").should("exist");

    cy.location("search").should("include", "hasOverdueTasks=true");
  });

  it("filter by position", () => {
    cy.getByData("user-filters-modal-trigger-large").click();

    cy.getByData("position-checkbox", "1").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("user-list-item").should("have.length", 2);
    cy.getByData("user-list-item", "user-1").should("exist");
    cy.getByData("user-list-item", "user-2").should("exist");

    cy.location("search").should("include", "positionIds=1");
  });
});
