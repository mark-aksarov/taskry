import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { E2ESeedPayload } from "@/prisma/e2e/types";

describe("Update Task Status", () => {
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
          status: ProjectStatus.active,
          deadline: new Date("2022-01-01"),
          categoryId: 1,
          customerId: 1,
          workspaceId: 1,
          creatorId: "user-1",
        },
        {
          id: 2,
          title: "Project 2",
          status: ProjectStatus.pending,
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
          status: TaskStatus.active,
          deadline: new Date("2022-01-01"),
          categoryId: 1,
          projectId: 1,
          workspaceId: 1,
          creatorId: "user-1",
          assigneeId: "user-1",
        },
        {
          id: 2,
          title: "Task 2",
          status: TaskStatus.pending,
          deadline: new Date("2022-01-01"),
          categoryId: 1,
          projectId: 1,
          workspaceId: 1,
          creatorId: "user-1",
          assigneeId: "user-1",
        },
        {
          id: 3,
          title: "Task 3",
          status: TaskStatus.completed,
          deadline: new Date("2022-01-01"),
          categoryId: 1,
          projectId: 1,
          workspaceId: 1,
          creatorId: "user-1",
          assigneeId: "user-1",
        },
        {
          id: 4,
          title: "Task 4",
          status: TaskStatus.pending,
          deadline: new Date("2022-01-01"),
          categoryId: 1,
          projectId: 2,
          workspaceId: 1,
          creatorId: "user-1",
          assigneeId: "user-1",
        },
        {
          id: 5,
          title: "Task 5",
          status: TaskStatus.completed,
          deadline: new Date("2022-01-01"),
          categoryId: 1,
          projectId: 2,
          workspaceId: 1,
          creatorId: "user-1",
          assigneeId: "user-1",
        },
      ],
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("owner@example.com", "12345abc");
    cy.visit("/en/tasks");
  });

  it("should update 'active' task status ('active' project) to 'pending'", () => {
    cy.getByData("task-1-checkbox").click();
    cy.getMenuItem("task-item-1-action-menu-trigger", "pending").click();
    cy.getByData("task-list-item")
      .eq(0)
      .contains(/pending/i);
  });
  it("should update 'active' task status ('active' project) to 'completed'", () => {
    cy.getByData("task-1-checkbox").click();
    cy.getMenuItem("task-item-1-action-menu-trigger", "completed").click();
    cy.getByData("task-list-item")
      .eq(0)
      .contains(/completed/i);
  });

  it("should update 'pending' task status ('active' project) to 'active'", () => {
    cy.getByData("task-2-checkbox").click();
    cy.getMenuItem("task-item-2-action-menu-trigger", "active").click();
    cy.getByData("task-list-item")
      .eq(1)
      .contains(/active/i);
  });
  it("should update 'pending' task status ('active' project) to 'completed'", () => {
    cy.getByData("task-2-checkbox").click();
    cy.getMenuItem("task-item-2-action-menu-trigger", "completed").click();
    cy.getByData("task-list-item")
      .eq(1)
      .contains(/completed/i);
  });

  it("should update 'completed' task status ('active' project) to 'active'", () => {
    cy.getByData("task-3-checkbox").click();
    cy.getMenuItem("task-item-3-action-menu-trigger", "active").click();
    cy.getByData("task-list-item")
      .eq(2)
      .contains(/active/i);
  });
  it("should update 'completed' task status ('active' project) to 'pending'", () => {
    cy.getByData("task-3-checkbox").click();
    cy.getMenuItem("task-item-3-action-menu-trigger", "pending").click();
    cy.getByData("task-list-item")
      .eq(2)
      .contains(/pending/i);
  });

  it("should update 'pending' task status ('pending' project) to 'completed'", () => {
    cy.getByData("task-4-checkbox").click();
    cy.getMenuItem("task-item-4-action-menu-trigger", "completed").click();
    cy.getByData("task-list-item")
      .eq(3)
      .contains(/completed/i);
  });
  it("should update 'completed' task status ('pending' project) to 'pending'", () => {
    cy.getByData("task-5-checkbox").click();
    cy.getMenuItem("task-item-5-action-menu-trigger", "pending").click();
    cy.getByData("task-list-item")
      .eq(4)
      .contains(/pending/i);
  });
});
