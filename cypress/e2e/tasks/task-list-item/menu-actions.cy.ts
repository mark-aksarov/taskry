import { E2ESeedPayload } from "../../../../prisma/e2e/types";
import { ProjectStatus, TaskStatus } from "../../../../generated/prisma/enums";

const createPayload = (
  overrides: Partial<E2ESeedPayload> = {},
): E2ESeedPayload => {
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
    taskCategories: [
      { id: 1, name: "Category 1", workspaceId: 1 },
      { id: 2, name: "Category 2", workspaceId: 1 },
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
        status: ProjectStatus.active,
        deadline: new Date("2022-01-01"),
        categoryId: 1,
        customerId: 1,
        workspaceId: 1,
        creatorId: "user-1",
      },
      ...(overrides?.projects ?? []),
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
      ...(overrides?.tasks ?? []),
    ],
  };

  return { ...basePayload, ...overrides };
};

describe("Menu Actions", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.task("db:reset");
  });

  describe("Edit & Delete", () => {
    const allowedUsers = [
      { label: "Owner", email: "owner@example.com", id: "user-1" },
      { label: "Manager", email: "manager@example.com", id: "user-2" },
    ];

    allowedUsers.forEach((user) => {
      describe(`Role: ${user.label}`, () => {
        describe("Owner Actions", () => {
          beforeEach(() => {
            cy.task("db:seed", createPayload());
            cy.signIn("owner@example.com", "12345abc", "/tasks");
          });

          it("can edit a task", () => {
            cy.getMenuItem(
              "task-list-item-action-menu-trigger",
              "edit",
            ).click();

            cy.get('input[name="title"]').clear().type("Updated Task Title");
            cy.get('textarea[name="description"]')
              .clear()
              .type("Updated Task Description");
            cy.setDatePickerDate("deadline-date-picker", "31", "12", "2025");

            ["status", "category", "project", "assignee"].forEach((field) => {
              cy.changeSelection(`${field}-select`);
            });

            cy.get('button[type="submit"]').click();
            cy.getByData("edit-task-modal").should("not.exist");
          });

          it("can delete a task", () => {
            cy.getMenuItem(
              "task-list-item-action-menu-trigger",
              "delete",
            ).click();
            cy.getByData("confirm-button").click();
            cy.getByData("confirm-modal").should("not.exist");
          });
        });
      });
    });

    const notAllowedUsers = [
      { label: "User", email: "user@example.com", id: "user-3" },
      { label: "Guest", email: "guest@example.com", id: "user-4" },
    ];

    notAllowedUsers.forEach((user) => {
      describe(`Role: ${user.label}`, () => {
        describe("User Actions", () => {
          beforeEach(() => {
            cy.task("db:seed", createPayload());
            cy.signIn("user@example.com", "12345abc", "/tasks");
          });

          it("cannot edit a task", () => {
            cy.getMenuItem("task-list-item-action-menu-trigger", "edit").should(
              "have.attr",
              "aria-disabled",
              "true",
            );
          });

          it("cannot delete a task", () => {
            cy.getMenuItem(
              "task-list-item-action-menu-trigger",
              "delete",
            ).should("have.attr", "aria-disabled", "true");
          });
        });
      });
    });
  });

  describe("Task Status Transition Rules", () => {
    const users = [
      { label: "Owner", email: "owner@example.com", id: "user-1" },
      { label: "Manager", email: "manager@example.com", id: "user-2" },
      { label: "User", email: "user@example.com", id: "user-3" },
      { label: "Guest", email: "guest@example.com", id: "user-4" },
    ];

    const rules = [
      {
        pStatus: ProjectStatus.pending,
        tStatus: TaskStatus.pending,
        allowed: ["completed"],
      },
      {
        pStatus: ProjectStatus.active,
        tStatus: TaskStatus.active,
        allowed: ["pending", "completed"],
      },
    ];

    users.forEach((user) => {
      describe(`Role: ${user.label}`, () => {
        rules.forEach(({ pStatus, tStatus, allowed }) => {
          describe(`Context: Project(${pStatus}) and Task(${tStatus})`, () => {
            beforeEach(() => {
              cy.task(
                "db:seed",
                createPayload({
                  projects: [
                    {
                      id: 1,
                      title: "Project 1",
                      status: pStatus,
                      deadline: new Date("2022-01-01"),
                      categoryId: 1,
                      customerId: 1,
                      workspaceId: 1,
                      creatorId: user.id,
                    },
                  ],

                  tasks: [
                    {
                      id: 1,
                      title: "Task 1",
                      status: tStatus,
                      deadline: new Date("2022-01-01"),
                      categoryId: 1,
                      projectId: 1,
                      workspaceId: 1,
                      creatorId: "user-1",
                      assigneeId: user.id,
                    },
                  ],
                }),
              );

              cy.signIn(user.email, "12345abc", "/tasks");
            });

            ["pending", "active", "completed"].forEach((target) => {
              const isAuthorized = user.id !== "user-4";
              const isAllowedStatus = allowed.includes(target);
              const canTransition = isAuthorized && isAllowedStatus;

              it(`${canTransition ? "allows" : "prevents"} transition to '${target}'`, () => {
                const item = cy.getMenuItem(
                  "task-list-item-action-menu-trigger",
                  target,
                );

                if (canTransition) {
                  item.should("not.have.attr", "aria-disabled", "true");
                  item.click();
                } else {
                  item.should("have.attr", "aria-disabled", "true");
                }
              });
            });
          });
        });
      });
    });
  });
});
