import { E2ESeedPayload } from "@/prisma/e2e/types";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

const createPayload = (payload: E2ESeedPayload): E2ESeedPayload => {
  const basePayload: E2ESeedPayload = {
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
    taskCategories: [
      { id: 1, name: "Category 1", workspaceId: 1 },
      { id: 2, name: "Category 2", workspaceId: 1 },
    ],
  };

  return { ...basePayload, ...payload };
};

const setup = (payload: E2ESeedPayload) => {
  cy.task("db:reset");
  cy.task("db:seed", payload);
};

describe("edit a new task", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
  });

  it.only("can edit a task", () => {
    setup(
      createPayload({
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
            status: ProjectStatus.active,
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
            assigneeId: "user-3",
          },
        ],
      }),
    );
    cy.signIn("owner@example.com", "12345abc");
    cy.visit("/en/tasks");

    cy.getMenuItem("task-item-1-action-menu-trigger", "edit").click();

    // fill form
    cy.get('input[name="title"]').clear().type("Updated Task Title");
    cy.get('textarea[name="description"]')
      .clear()
      .type("Updated Task Description");
    cy.setDatePickerDate("deadline-date-picker", "12", "31", "2025");
    cy.changeSelection("status-select", "pending");
    cy.changeSelection("category-select", "2");
    cy.changeSelection("project-select", "2");
    cy.changeSelection("assignee-select", "user-2");

    // submit
    cy.get('button[type="submit"]').click();

    // assert
    cy.getByData("task-list-item").within(() => {
      cy.contains("Updated Task Title");
      cy.contains("Category 2");
      cy.contains("Project 2");
      cy.contains("Pending");
    });

    // check notifications
    cy.checkNotifications(0);

    // sign in as user-2
    cy.signIn("manager@example.com", "12345abc");
    cy.visit("/en/tasks");

    // check notifications
    cy.checkNotifications(2, [
      {
        target: "Updated Task Title",
        actor: "John Doe",
        action: "changed the task status",
      },
      {
        target: "Updated Task Title",
        actor: "John Doe",
        action: "changed the task deadline",
      },
    ]);

    // sign in as user-3
    cy.signIn("user@example.com", "12345abc");
    cy.visit("/en/tasks");

    // check notifications
    cy.checkNotifications(2, [
      {
        target: "Updated Task Title",
        actor: "John Doe",
        action: "changed the task status",
      },
      {
        target: "Updated Task Title",
        actor: "John Doe",
        action: "changed the task deadline",
      },
    ]);
  });

  describe("access control (RBAC)", () => {
    beforeEach(() => {
      setup(
        createPayload({
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
          ],
        }),
      );
    });

    it("allows a user with 'owner' role to open the edit modal", () => {
      cy.signIn("owner@example.com", "12345abc");
      cy.visit("/en/tasks");
      cy.getMenuItem("task-item-1-action-menu-trigger", "edit").click();
      cy.getByData("edit-task-modal").should("be.visible");
    });

    it("allows a user with 'manager' role to open the edit modal", () => {
      cy.signIn("manager@example.com", "12345abc");
      cy.visit("/en/tasks");
      cy.getMenuItem("task-item-1-action-menu-trigger", "edit").click();
      cy.getByData("edit-task-modal").should("be.visible");
    });

    it("prevents 'user' from editing by disabling the menu option", () => {
      cy.signIn("user@example.com", "12345abc");
      cy.visit("/en/tasks");
      cy.getMenuItem("task-item-1-action-menu-trigger", "edit").should(
        "have.attr",
        "aria-disabled",
        "true",
      );
    });

    it("shows a restriction modal when a 'guest' attempts to edit", () => {
      cy.signIn("guest@example.com", "12345abc");
      cy.visit("/en/tasks");
      cy.getMenuItem("task-item-1-action-menu-trigger", "edit").click();
      cy.getByData("guest-mode-modal").should("be.visible");
    });
  });

  describe("Task Status Transition Logic", () => {
    const transitionRules = [
      {
        pStatus: ProjectStatus.active,
        tStatus: TaskStatus.active,
        disabled: ["active"],
        enabled: ["pending", "completed"],
      },
      {
        pStatus: ProjectStatus.active,
        tStatus: TaskStatus.pending,
        disabled: ["pending"],
        enabled: ["active", "completed"],
      },
      {
        pStatus: ProjectStatus.active,
        tStatus: TaskStatus.completed,
        disabled: ["completed"],
        enabled: ["active", "pending"],
      },
      {
        pStatus: ProjectStatus.pending,
        tStatus: TaskStatus.pending,
        disabled: ["active", "pending"],
        enabled: ["completed"],
      },
      {
        pStatus: ProjectStatus.pending,
        tStatus: TaskStatus.completed,
        disabled: ["active", "completed"],
        enabled: ["pending"],
      },
      {
        pStatus: ProjectStatus.completed,
        tStatus: TaskStatus.completed,
        disabled: ["active", "pending", "completed"],
        enabled: [],
      },
    ];

    transitionRules.forEach((rule) => {
      const contextName = `Project: ${rule.pStatus} | Task: ${rule.tStatus}`;

      describe(contextName, () => {
        beforeEach(() => {
          setup(
            createPayload({
              projects: [
                {
                  id: 1,
                  title: "Project 1",
                  status: rule.pStatus,
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
                  status: rule.tStatus,
                  deadline: new Date("2022-01-01"),
                  categoryId: 1,
                  projectId: 1,
                  workspaceId: 1,
                  creatorId: "user-1",
                  assigneeId: "user-1",
                },
              ],
            }),
          );
          cy.signIn("owner@example.com", "12345abc");
          cy.visit("/en/tasks");
        });

        rule.disabled.forEach((targetStatus) => {
          it(`should disable the option to transition to '${targetStatus}'`, () => {
            cy.getMenuItem(
              "task-item-1-action-menu-trigger",
              targetStatus,
            ).should("have.attr", "aria-disabled", "true");
          });
        });

        rule.enabled.forEach((targetStatus) => {
          it(`should allow the option to transition to '${targetStatus}'`, () => {
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
