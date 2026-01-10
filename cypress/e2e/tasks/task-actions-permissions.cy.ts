import { E2ESeedPayload } from "@/prisma/e2e/types";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

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

describe("task actions permissions", () => {
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
