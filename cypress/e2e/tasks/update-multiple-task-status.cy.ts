import { E2ESeedPayload } from "@/prisma/e2e/types";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

describe("update multiple task status", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload: E2ESeedPayload = {
      companies: [{ id: 1, name: "Company 1", workspaceId: 1 }],
      customers: [
        {
          id: 1,
          email: "customer@example.com",
          fullName: "John Doe",
          companyId: 1,
          workspaceId: 1,
        },
      ],
      projectCategories: [{ id: 1, name: "Category 1", workspaceId: 1 }],
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
        {
          id: 3,
          title: "Project 3",
          status: ProjectStatus.completed,
          deadline: new Date("2022-01-01"),
          categoryId: 1,
          customerId: 1,
          workspaceId: 1,
          creatorId: "user-1",
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
        {
          id: 6,
          title: "Task 6",
          status: TaskStatus.completed,
          deadline: new Date("2022-01-01"),
          categoryId: 1,
          projectId: 3,
          workspaceId: 1,
          creatorId: "user-1",
          assigneeId: "user-3",
        },
      ],
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("owner@example.com", "12345abc");
    cy.visit("/en/tasks");
  });

  describe("status transition validation", () => {
    describe("should disable transition when every current status is the same as target status", () => {
      it("should disable transition for active tasks (active project) to active", () => {
        cy.getByData("task-1-checkbox").click();
        cy.getMenuItem("toolbar-action-menu-trigger", "active").should(
          "have.attr",
          "aria-disabled",
          "true",
        );
      });

      it("should disable transition for pending tasks (pending project) to pending", () => {
        cy.getByData("task-4-checkbox").click();
        cy.getMenuItem("toolbar-action-menu-trigger", "pending").should(
          "have.attr",
          "aria-disabled",
          "true",
        );
      });

      it("should disable transition for completed tasks (completed project) to completed", () => {
        cy.getByData("task-6-checkbox").click();
        cy.getMenuItem("toolbar-action-menu-trigger", "completed").should(
          "have.attr",
          "aria-disabled",
          "true",
        );
      });

      it("should disable transition for completed tasks (pending + completed projects) to completed", () => {
        cy.getByData("task-5-checkbox").click();
        cy.getByData("task-6-checkbox").click();
        cy.getMenuItem("toolbar-action-menu-trigger", "completed").should(
          "have.attr",
          "aria-disabled",
          "true",
        );
      });

      it("should disable transition for pending tasks (active + pending projects) to pending", () => {
        cy.getByData("task-2-checkbox").click();
        cy.getByData("task-4-checkbox").click();
        cy.getMenuItem("toolbar-action-menu-trigger", "pending").should(
          "have.attr",
          "aria-disabled",
          "true",
        );
      });

      it("should disable transition for completed tasks (active + pending + completed projects) to completed", () => {
        cy.getByData("task-3-checkbox").click();
        cy.getByData("task-5-checkbox").click();
        cy.getByData("task-6-checkbox").click();
        cy.getMenuItem("toolbar-action-menu-trigger", "completed").should(
          "have.attr",
          "aria-disabled",
          "true",
        );
      });
    });

    describe("should disable transition when no one task can be changed to target status", () => {
      it("should disable transition for pending tasks (pending project) to active", () => {
        cy.getByData("task-4-checkbox").click();
        cy.getMenuItem("toolbar-action-menu-trigger", "active").should(
          "have.attr",
          "aria-disabled",
          "true",
        );
      });

      it("should disable transition for completed tasks (pending project) to active", () => {
        cy.getByData("task-5-checkbox").click();
        cy.getMenuItem("toolbar-action-menu-trigger", "active").should(
          "have.attr",
          "aria-disabled",
          "true",
        );
      });

      it("should disable transition for mixed tasks (pending project) to active", () => {
        cy.getByData("task-4-checkbox").click();
        cy.getByData("task-5-checkbox").click();
        cy.getMenuItem("toolbar-action-menu-trigger", "active").should(
          "have.attr",
          "aria-disabled",
          "true",
        );
      });

      it("should disable transition for mixed tasks (pending + completed projects) to active", () => {
        cy.getByData("task-4-checkbox").click();
        cy.getByData("task-5-checkbox").click();
        cy.getByData("task-6-checkbox").click();
        cy.getMenuItem("toolbar-action-menu-trigger", "active").should(
          "have.attr",
          "aria-disabled",
          "true",
        );
      });

      it("should disable transition for completed tasks (completed project) to active", () => {
        cy.getByData("task-6-checkbox").click();
        cy.getMenuItem("toolbar-action-menu-trigger", "active").should(
          "have.attr",
          "aria-disabled",
          "true",
        );
      });

      it("should disable transition for completed tasks (completed project) to pending", () => {
        cy.getByData("task-6-checkbox").click();
        cy.getMenuItem("toolbar-action-menu-trigger", "pending").should(
          "have.attr",
          "aria-disabled",
          "true",
        );
      });
    });

    describe("should skip transition for some tasks", () => {
      it("should skip transition: pending task (pending project) cannot change to active", () => {
        cy.getByData("task-2-checkbox").click();
        cy.getByData("task-4-checkbox").click();
        cy.getMenuItem("toolbar-action-menu-trigger", "active").click();
        cy.getByData("confirm-button").click();

        cy.getByData("task-list-item")
          .eq(1)
          .contains(/active/i);

        cy.getByData("task-list-item")
          .eq(3)
          .contains(/pending/i);
      });

      it("should skip transition: completed task (pending project) cannot change to active", () => {
        cy.getByData("task-2-checkbox").click();
        cy.getByData("task-5-checkbox").click();
        cy.getMenuItem("toolbar-action-menu-trigger", "active").click();
        cy.getByData("confirm-button").click();

        cy.getByData("task-list-item")
          .eq(1)
          .contains(/active/i);

        cy.getByData("task-list-item")
          .eq(4)
          .contains(/completed/i);
      });

      it("should skip transition: completed tasks (pending + completed projects) cannot change to active", () => {
        cy.getByData("task-2-checkbox").click();
        cy.getByData("task-5-checkbox").click();
        cy.getByData("task-6-checkbox").click();
        cy.getMenuItem("toolbar-action-menu-trigger", "active").click();
        cy.getByData("confirm-button").click();

        cy.getByData("task-list-item")
          .eq(1)
          .contains(/active/i);

        cy.getByData("task-list-item")
          .eq(4)
          .contains(/completed/i);

        cy.getByData("task-list-item")
          .eq(5)
          .contains(/completed/i);
      });

      it("should skip transition: completed task (completed project) cannot change to pending", () => {
        cy.getByData("task-1-checkbox").click();
        cy.getByData("task-6-checkbox").click();
        cy.getMenuItem("toolbar-action-menu-trigger", "pending").click();
        cy.getByData("confirm-button").click();

        cy.getByData("task-list-item")
          .eq(1)
          .contains(/pending/i);

        cy.getByData("task-list-item")
          .eq(5)
          .contains(/completed/i);
      });

      it("should skip transition: completed task (completed project) cannot change to active", () => {
        cy.getByData("task-2-checkbox").click();
        cy.getByData("task-6-checkbox").click();
        cy.getMenuItem("toolbar-action-menu-trigger", "active").click();
        cy.getByData("confirm-button").click();

        cy.getByData("task-list-item")
          .eq(1)
          .contains(/active/i);

        cy.getByData("task-list-item")
          .eq(5)
          .contains(/completed/i);
      });

      it("should skip transition: completed task (completed project) cannot change to pending", () => {
        cy.getByData("task-5-checkbox").click();
        cy.getByData("task-6-checkbox").click();
        cy.getMenuItem("toolbar-action-menu-trigger", "pending").click();
        cy.getByData("confirm-button").click();

        cy.getByData("task-list-item")
          .eq(4)
          .contains(/pending/i);

        cy.getByData("task-list-item")
          .eq(5)
          .contains(/completed/i);
      });

      it("should skip transition: completed tasks (pending + completed projects) cannot change to pending", () => {
        cy.getByData("task-1-checkbox").click();
        cy.getByData("task-5-checkbox").click();
        cy.getByData("task-6-checkbox").click();
        cy.getMenuItem("toolbar-action-menu-trigger", "pending").click();
        cy.getByData("confirm-button").click();

        cy.getByData("task-list-item")
          .eq(1)
          .contains(/pending/i);

        cy.getByData("task-list-item")
          .eq(4)
          .contains(/completed/i);

        cy.getByData("task-list-item")
          .eq(5)
          .contains(/completed/i);
      });
    });
  });

  describe("should change status for all tasks", () => {
    it("should change status for active task (active project) -> to pending", () => {
      cy.getByData("task-1-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "pending").click();
      cy.getByData("task-list-item")
        .eq(0)
        .contains(/pending/i);
    });

    it("should change status for completed task (active project) -> to pending", () => {
      cy.getByData("task-3-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "pending").click();
      cy.getByData("task-list-item")
        .eq(2)
        .contains(/pending/i);
    });

    it("should change status for active task (active project) -> to completed", () => {
      cy.getByData("task-1-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "completed").click();
      cy.getByData("task-list-item")
        .eq(0)
        .contains(/completed/i);
    });

    it("should change status for pending task (active project) -> to completed", () => {
      cy.getByData("task-2-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "completed").click();
      cy.getByData("task-list-item")
        .eq(1)
        .contains(/completed/i);
    });

    it("should change status for pending task (active project) -> to active", () => {
      cy.getByData("task-2-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "active").click();
      cy.getByData("task-list-item")
        .eq(1)
        .contains(/active/i);
    });

    it("should change status for completed task (active project) -> to active", () => {
      cy.getByData("task-3-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "active").click();
      cy.getByData("task-list-item")
        .eq(2)
        .contains(/active/i);
    });

    it("should change status for active task (active project) + pending task (pending project) -> to pending", () => {
      cy.getByData("task-1-checkbox").click();
      cy.getByData("task-4-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "pending").click();

      cy.getByData("task-list-item")
        .eq(0)
        .contains(/pending/i);
      cy.getByData("task-list-item")
        .eq(3)
        .contains(/pending/i);
    });

    it("should change status for active task (active project) + completed task (pending project) -> to pending", () => {
      cy.getByData("task-1-checkbox").click();
      cy.getByData("task-5-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "pending").click();

      cy.getByData("task-list-item")
        .eq(0)
        .contains(/pending/i);
      cy.getByData("task-list-item")
        .eq(4)
        .contains(/pending/i);
    });

    it("should change status for pending task (active project) + completed task (pending project) -> to pending", () => {
      cy.getByData("task-2-checkbox").click();
      cy.getByData("task-5-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "pending").click();

      cy.getByData("task-list-item")
        .eq(1)
        .contains(/pending/i);
      cy.getByData("task-list-item")
        .eq(4)
        .contains(/pending/i);
    });

    it("should change status for active task (active project) + pending task (pending project) -> to completed", () => {
      cy.getByData("task-1-checkbox").click();
      cy.getByData("task-4-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "completed").click();

      cy.getByData("task-list-item")
        .eq(0)
        .contains(/completed/i);
      cy.getByData("task-list-item")
        .eq(3)
        .contains(/completed/i);
    });

    it("should change status for active task (active project) + completed task (pending project) -> to completed", () => {
      cy.getByData("task-1-checkbox").click();
      cy.getByData("task-5-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "completed").click();

      cy.getByData("task-list-item")
        .eq(0)
        .contains(/completed/i);
      cy.getByData("task-list-item")
        .eq(4)
        .contains(/completed/i);
    });

    it("should change status for pending task (active project) + completed task (pending project) -> to completed", () => {
      cy.getByData("task-2-checkbox").click();
      cy.getByData("task-5-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "completed").click();

      cy.getByData("task-list-item")
        .eq(1)
        .contains(/completed/i);
      cy.getByData("task-list-item")
        .eq(4)
        .contains(/completed/i);
    });

    it("should change status for pending + completed tasks (active project) -> to active", () => {
      cy.getByData("task-2-checkbox").click();
      cy.getByData("task-3-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "active").click();

      cy.getByData("task-list-item")
        .eq(1)
        .contains(/active/i);
      cy.getByData("task-list-item")
        .eq(2)
        .contains(/active/i);
    });

    it("should change status for active + completed tasks (active project) -> to pending", () => {
      cy.getByData("task-1-checkbox").click();
      cy.getByData("task-3-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "pending").click();

      cy.getByData("task-list-item")
        .eq(0)
        .contains(/pending/i);
      cy.getByData("task-list-item")
        .eq(2)
        .contains(/pending/i);
    });

    it("should change status for active + pending tasks (active project) -> to completed", () => {
      cy.getByData("task-1-checkbox").click();
      cy.getByData("task-2-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "completed").click();

      cy.getByData("task-list-item")
        .eq(0)
        .contains(/completed/i);
      cy.getByData("task-list-item")
        .eq(1)
        .contains(/completed/i);
    });

    it("should change status for active + completed tasks (active project) + pending task (pending project) -> to pending", () => {
      cy.getByData("task-1-checkbox").click();
      cy.getByData("task-3-checkbox").click();
      cy.getByData("task-4-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "pending").click();

      cy.getByData("task-list-item")
        .eq(0)
        .contains(/pending/i);
      cy.getByData("task-list-item")
        .eq(2)
        .contains(/pending/i);
      cy.getByData("task-list-item")
        .eq(3)
        .contains(/pending/i);
    });

    it("should change status for active + completed tasks (active project) + completed task (pending project) -> to completed", () => {
      cy.getByData("task-1-checkbox").click();
      cy.getByData("task-3-checkbox").click();
      cy.getByData("task-5-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "completed").click();

      cy.getByData("task-list-item")
        .eq(0)
        .contains(/completed/i);
      cy.getByData("task-list-item")
        .eq(2)
        .contains(/completed/i);
      cy.getByData("task-list-item")
        .eq(4)
        .contains(/completed/i);
    });

    it("should change status for active + pending tasks (active project) + pending task (pending project) -> to completed", () => {
      cy.getByData("task-1-checkbox").click();
      cy.getByData("task-2-checkbox").click();
      cy.getByData("task-4-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "completed").click();

      cy.getByData("task-list-item")
        .eq(0)
        .contains(/completed/i);
      cy.getByData("task-list-item")
        .eq(1)
        .contains(/completed/i);
      cy.getByData("task-list-item")
        .eq(3)
        .contains(/completed/i);
    });

    it("should change status for active + completed tasks (active project) + completed task (completed project) -> to completed", () => {
      cy.getByData("task-1-checkbox").click();
      cy.getByData("task-3-checkbox").click();
      cy.getByData("task-6-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "completed").click();

      cy.getByData("task-list-item")
        .eq(0)
        .contains(/completed/i);
      cy.getByData("task-list-item")
        .eq(2)
        .contains(/completed/i);
      cy.getByData("task-list-item")
        .eq(5)
        .contains(/completed/i);
    });

    it("should change status for active + pending tasks (active project) + completed task (completed project) -> to completed", () => {
      cy.getByData("task-1-checkbox").click();
      cy.getByData("task-2-checkbox").click();
      cy.getByData("task-6-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "completed").click();

      cy.getByData("task-list-item")
        .eq(0)
        .contains(/completed/i);
      cy.getByData("task-list-item")
        .eq(1)
        .contains(/completed/i);
      cy.getByData("task-list-item")
        .eq(5)
        .contains(/completed/i);
    });

    it("should change status for pending + completed tasks (active project) + completed task (completed project) -> to completed", () => {
      cy.getByData("task-2-checkbox").click();
      cy.getByData("task-3-checkbox").click();
      cy.getByData("task-6-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "completed").click();

      cy.getByData("task-list-item")
        .eq(1)
        .contains(/completed/i);
      cy.getByData("task-list-item")
        .eq(2)
        .contains(/completed/i);
      cy.getByData("task-list-item")
        .eq(5)
        .contains(/completed/i);
    });

    it("should change status for pending task (pending project) + completed task (completed project) -> to completed", () => {
      cy.getByData("task-4-checkbox").click();
      cy.getByData("task-6-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "completed").click();

      cy.getByData("task-list-item")
        .eq(3)
        .contains(/completed/i);
      cy.getByData("task-list-item")
        .eq(5)
        .contains(/completed/i);
    });

    it("should change status for active task (active project) + completed task (completed project) -> to completed", () => {
      cy.getByData("task-1-checkbox").click();
      cy.getByData("task-6-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "completed").click();

      cy.getByData("task-list-item")
        .eq(0)
        .contains(/completed/i);
      cy.getByData("task-list-item")
        .eq(5)
        .contains(/completed/i);
    });

    it("should change status for pending task (active project) + completed task (completed project) -> to completed", () => {
      cy.getByData("task-2-checkbox").click();
      cy.getByData("task-6-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "completed").click();

      cy.getByData("task-list-item")
        .eq(1)
        .contains(/completed/i);
      cy.getByData("task-list-item")
        .eq(5)
        .contains(/completed/i);
    });

    it("should send notifications when task status is updated", () => {
      cy.getByData("task-2-checkbox").click();
      cy.getByData("task-3-checkbox").click();
      cy.getByData("task-6-checkbox").click();
      cy.getMenuItem("toolbar-action-menu-trigger", "completed").click();

      cy.getByData("task-list-item")
        .eq(1)
        .contains(/completed/i);
      cy.getByData("task-list-item")
        .eq(2)
        .contains(/completed/i);
      cy.getByData("task-list-item")
        .eq(5)
        .contains(/completed/i);

      // check notifications
      cy.checkNotifications(0);

      // sign in as user-2
      cy.signIn("manager@example.com", "12345abc");
      cy.visit("/en/tasks");

      // check notifications
      cy.checkNotifications(3, [
        {
          target: "Task 2",
          actor: "John Doe",
          action: "changed the task status",
          content: "completed",
        },
        {
          target: "Task 3",
          actor: "John Doe",
          action: "changed the task status",
          content: "completed",
        },
        {
          target: "Task 6",
          actor: "John Doe",
          action: "changed the task status",
          content: "completed",
        },
      ]);

      // sign in as user-3
      cy.signIn("user@example.com", "12345abc");
      cy.visit("/en/tasks");

      // check notifications
      cy.checkNotifications(1, [
        {
          target: "Task 6",
          actor: "John Doe",
          action: "changed the task status",
          content: "completed",
        },
      ]);
    });
  });
});
