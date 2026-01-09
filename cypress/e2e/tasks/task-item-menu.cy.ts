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

describe("Task Item Menu", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.task("db:reset");
  });

  describe("Edit & Delete", () => {
    const users = [
      {
        label: "Owner",
        email: "owner@example.com",
        id: "user-1",
        canEdit: true,
      },
      {
        label: "Manager",
        email: "manager@example.com",
        id: "user-2",
        canEdit: true,
      },
      {
        label: "User",
        email: "user@example.com",
        id: "user-3",
        canEdit: false,
      },
      {
        label: "Guest",
        email: "guest@example.com",
        id: "user-4",
        canEdit: false,
      },
    ];

    users.forEach((user) => {
      describe(`Role: ${user.label}`, () => {
        beforeEach(() => {
          cy.task("db:seed", createPayload());
          cy.signIn(user.email, "12345abc");
          cy.visit("/en/tasks");
        });

        it(`${user.canEdit ? "can" : "cannot"} edit a task`, () => {
          const edit = cy.getMenuItem(
            "task-item-1-action-menu-trigger",
            "edit",
          );

          user.canEdit
            ? edit.should("not.have.attr", "aria-disabled")
            : edit.should("have.attr", "aria-disabled", "true");
        });

        it(`${user.canEdit ? "can" : "cannot"} delete a task`, () => {
          const del = cy.getMenuItem(
            "task-item-1-action-menu-trigger",
            "delete",
          );

          user.canEdit
            ? del.should("not.have.attr", "aria-disabled")
            : del.should("have.attr", "aria-disabled", "true");
        });
      });
    });
  });

  describe.only("Task Status Transition Rules", () => {
    const users = {
      owner: { label: "Owner", email: "owner@example.com", id: "user-1" },
      manager: { label: "Manager", email: "manager@example.com", id: "user-2" },
      user: { label: "User", email: "user@example.com", id: "user-3" },
      guest: { label: "Guest", email: "guest@example.com", id: "user-4" },
    };

    const transitionRules = [
      //guest active project
      {
        user: users.guest,
        pStatus: ProjectStatus.active,
        tStatus: TaskStatus.active,
        disabled: ["active", "pending", "completed"],
        enabled: [],
      },
      {
        user: users.guest,
        pStatus: ProjectStatus.active,
        tStatus: TaskStatus.pending,
        disabled: ["active", "pending", "completed"],
        enabled: [],
      },
      {
        user: users.guest,
        pStatus: ProjectStatus.active,
        tStatus: TaskStatus.completed,
        disabled: ["active", "pending", "completed"],
        enabled: [],
      },

      //guest pending project
      {
        user: users.guest,
        pStatus: ProjectStatus.pending,
        tStatus: TaskStatus.pending,
        disabled: ["active", "pending", "completed"],
        enabled: [],
      },
      {
        user: users.guest,
        pStatus: ProjectStatus.pending,
        tStatus: TaskStatus.completed,
        disabled: ["active", "pending", "completed"],
        enabled: [],
      },

      //guest completed project
      {
        user: users.guest,
        pStatus: ProjectStatus.completed,
        tStatus: TaskStatus.completed,
        disabled: ["active", "pending", "completed"],
        enabled: [],
      },
    ];

    //Owner, Manager, User
    [users.owner, users.manager, users.user].forEach((user) => {
      transitionRules.push(
        //active project
        {
          user,
          pStatus: ProjectStatus.active,
          tStatus: TaskStatus.active,
          disabled: ["active"],
          enabled: ["pending", "completed"],
        },
        {
          user,
          pStatus: ProjectStatus.active,
          tStatus: TaskStatus.pending,
          disabled: ["pending"],
          enabled: ["active", "completed"],
        },
        {
          user,
          pStatus: ProjectStatus.active,
          tStatus: TaskStatus.completed,
          disabled: ["completed"],
          enabled: ["active", "pending"],
        },

        //pending project
        {
          user,
          pStatus: ProjectStatus.pending,
          tStatus: TaskStatus.pending,
          disabled: ["active", "pending"],
          enabled: ["completed"],
        },
        {
          user,
          pStatus: ProjectStatus.pending,
          tStatus: TaskStatus.completed,
          disabled: ["active", "completed"],
          enabled: ["pending"],
        },

        //completed project
        {
          user,
          pStatus: ProjectStatus.completed,
          tStatus: TaskStatus.completed,
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
            createPayload(rule.pStatus, rule.tStatus, rule.user.id),
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
