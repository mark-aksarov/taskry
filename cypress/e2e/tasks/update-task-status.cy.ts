import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { E2ESeedPayload } from "@/prisma/e2e/types";

describe("update task status", () => {
  describe("can update task status", () => {
    const createPayload = (payload: E2ESeedPayload): E2ESeedPayload => {
      const basePayload: E2ESeedPayload = {
        companies: [{ id: 1, name: "Company 1", workspaceId: 1 }],
        customers: [
          {
            id: 1,
            email: "owner@example.com",
            fullName: "John Doe",
            companyId: 1,
            workspaceId: 1,
          },
        ],
        projectCategories: [{ id: 1, name: "Category 1", workspaceId: 1 }],
        taskCategories: [{ id: 1, name: "Category 1", workspaceId: 1 }],
      };

      return { ...basePayload, ...payload };
    };

    beforeEach(() => {
      cy.viewport(1440, 900);

      const payload = createPayload({
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
      });

      cy.task("db:reset");
      cy.task("db:seed", payload);
      cy.signIn("owner@example.com", "12345abc");
      cy.visit("/en/tasks");
    });

    it("should update 'active' task status ('active' project) to 'pending'", () => {
      cy.getMenuItem("task-item-1-action-menu-trigger", "pending").click();
      cy.getByData("task-list-item")
        .eq(0)
        .contains(/pending/i);
    });

    it("should update 'active' task status ('active' project) to 'completed'", () => {
      cy.getMenuItem("task-item-1-action-menu-trigger", "completed").click();
      cy.getByData("task-list-item")
        .eq(0)
        .contains(/completed/i);
    });

    it("should update 'pending' task status ('active' project) to 'active'", () => {
      cy.getMenuItem("task-item-2-action-menu-trigger", "active").click();
      cy.getByData("task-list-item")
        .eq(1)
        .contains(/active/i);
    });

    it("should update 'pending' task status ('active' project) to 'completed'", () => {
      cy.getMenuItem("task-item-2-action-menu-trigger", "completed").click();
      cy.getByData("task-list-item")
        .eq(1)
        .contains(/completed/i);
    });

    it("should update 'completed' task status ('active' project) to 'active'", () => {
      cy.getMenuItem("task-item-3-action-menu-trigger", "active").click();
      cy.getByData("task-list-item")
        .eq(2)
        .contains(/active/i);
    });

    it("should update 'completed' task status ('active' project) to 'pending'", () => {
      cy.getMenuItem("task-item-3-action-menu-trigger", "pending").click();
      cy.getByData("task-list-item")
        .eq(2)
        .contains(/pending/i);
    });

    it("should update 'pending' task status ('pending' project) to 'completed'", () => {
      cy.getMenuItem("task-item-4-action-menu-trigger", "completed").click();
      cy.getByData("task-list-item")
        .eq(3)
        .contains(/completed/i);
    });

    it("should update 'completed' task status ('pending' project) to 'pending'", () => {
      cy.getMenuItem("task-item-5-action-menu-trigger", "pending").click();
      cy.getByData("task-list-item")
        .eq(4)
        .contains(/pending/i);
    });

    it("should send notifications when task status is updated", () => {
      cy.getMenuItem("task-item-1-action-menu-trigger", "pending").click();
      cy.getByData("task-list-item")
        .eq(0)
        .contains(/pending/i);

      // check notifications
      cy.checkNotifications(0);

      // sign in as user-2
      cy.signIn("manager@example.com", "12345abc");
      cy.visit("/en/tasks");

      // check notifications
      cy.checkNotifications(1, [
        {
          target: "Task 1",
          actor: "John Doe",
          action: "changed the task status",
        },
      ]);
    });
  });

  describe("task status update permissions", () => {
    const createPayload = (
      projectStatus: ProjectStatus = "active",
      taskStatus: TaskStatus = "active",
      assigneeId: string = "user-1",
    ): E2ESeedPayload => {
      const payload: E2ESeedPayload = {
        companies: [{ id: 1, name: "Company 1", workspaceId: 1 }],
        customers: [
          {
            id: 1,
            email: "owner@example.com",
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
            status: projectStatus,
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
            status: taskStatus,
            deadline: new Date("2022-01-01"),
            categoryId: 1,
            projectId: 1,
            workspaceId: 1,
            creatorId: "user-1",
            assigneeId,
          },
        ],
      };

      return payload;
    };

    beforeEach(() => {
      cy.viewport(1440, 900);
      cy.task("db:reset");
    });

    describe("Task Status Disabled Transitions by Role and Project Status", () => {
      const users = {
        owner: {
          label: "Owner",
          email: "owner@example.com",
          id: "user-1",
        },
        manager: {
          label: "Manager",
          email: "manager@example.com",
          id: "user-2",
          assigneeId: "user-1",
        },
        user: {
          label: "User",
          email: "user@example.com",
          id: "user-3",
        },
        guest: {
          label: "Guest",
          email: "guest@example.com",
          id: "user-4",
        },
      };

      const transitionRules = [
        //active project
        {
          user: users.user,
          pStatus: ProjectStatus.active,
          tStatus: TaskStatus.active,
          tAssigneeId: "user-1",
          disabled: ["active", "pending", "completed"],
          enabled: [],
        },
        {
          user: users.user,
          pStatus: ProjectStatus.active,
          tStatus: TaskStatus.pending,
          tAssigneeId: "user-1",
          disabled: ["active", "pending", "completed"],
          enabled: [],
        },
        {
          user: users.user,
          pStatus: ProjectStatus.active,
          tStatus: TaskStatus.completed,
          tAssigneeId: "user-1",
          disabled: ["active", "pending", "completed"],
          enabled: [],
        },

        //pending project
        {
          user: users.user,
          pStatus: ProjectStatus.pending,
          tStatus: TaskStatus.pending,
          tAssigneeId: "user-1",
          disabled: ["active", "pending", "completed"],
          enabled: [],
        },
        {
          user: users.user,
          pStatus: ProjectStatus.pending,
          tStatus: TaskStatus.completed,
          tAssigneeId: "user-1",
          disabled: ["active", "pending", "completed"],
          enabled: [],
        },

        //completed project
        {
          user: users.user,
          pStatus: ProjectStatus.completed,
          tStatus: TaskStatus.completed,
          tAssigneeId: "user-1",
          disabled: ["active", "pending", "completed"],
          enabled: [],
        },
      ];

      //Owner, Manager, User, Guest
      [users.owner, users.manager, users.user, users.guest].forEach((user) => {
        transitionRules.push(
          //active project
          {
            user,
            pStatus: ProjectStatus.active,
            tStatus: TaskStatus.active,
            disabled: ["active"],
            tAssigneeId: user.id,
            enabled: ["pending", "completed"],
          },
          {
            user,
            pStatus: ProjectStatus.active,
            tStatus: TaskStatus.pending,
            disabled: ["pending"],
            tAssigneeId: user.id,
            enabled: ["active", "completed"],
          },
          {
            user,
            pStatus: ProjectStatus.active,
            tStatus: TaskStatus.completed,
            disabled: ["completed"],
            tAssigneeId: user.id,
            enabled: ["active", "pending"],
          },

          //pending project
          {
            user,
            pStatus: ProjectStatus.pending,
            tStatus: TaskStatus.pending,
            tAssigneeId: user.id,
            disabled: ["active", "pending"],
            enabled: ["completed"],
          },
          {
            user,
            pStatus: ProjectStatus.pending,
            tStatus: TaskStatus.completed,
            tAssigneeId: user.id,
            disabled: ["active", "completed"],
            enabled: ["pending"],
          },

          //completed project
          {
            user,
            pStatus: ProjectStatus.completed,
            tStatus: TaskStatus.completed,
            tAssigneeId: user.id,
            disabled: ["active", "pending", "completed"],
            enabled: [],
          },
        );
      });

      beforeEach(() => {
        cy.viewport(1440, 900);
        cy.task("db:reset");
      });

      transitionRules.forEach((rule) => {
        const contextName = `Role: ${rule.user.label} | Project: ${rule.pStatus} | Task: ${rule.tStatus}`;

        describe(contextName, () => {
          beforeEach(() => {
            cy.task(
              "db:seed",
              createPayload(rule.pStatus, rule.tStatus, rule.tAssigneeId),
            );
            cy.signIn(rule.user.email, "12345abc");
            cy.visit("/en/tasks");
          });

          rule.disabled.forEach((targetStatus) => {
            it(`should disable transition to '${targetStatus}'`, () => {
              cy.getMenuItem(
                "task-item-1-action-menu-trigger",
                targetStatus,
              ).should("have.attr", "aria-disabled", "true");
            });
          });

          rule.enabled.forEach((targetStatus) => {
            it(`should enable transition to '${targetStatus}'`, () => {
              cy.getMenuItem(
                "task-item-1-action-menu-trigger",
                targetStatus,
              ).should("not.have.attr", "aria-disabled");
            });
          });
        });
      });
    });
  });
});
