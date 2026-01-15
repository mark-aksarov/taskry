import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";
import { E2ESeedPayload } from "@/prisma/e2e/types";

describe("search", () => {
  before(() => {
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

      projects: [
        {
          id: 1,
          title: "Project 1",
          status: ProjectStatus.active,
          deadline: new Date(),
          categoryId: 1,
          customerId: 1,
          workspaceId: 1,
          creatorId: "user-1",
        },
        {
          id: 2,
          title: "Project 2",
          status: ProjectStatus.active,
          deadline: new Date(),
          categoryId: 1,
          customerId: 1,
          workspaceId: 1,
          creatorId: "user-1",
        },
      ],

      taskCategories: [{ id: 1, name: "Category 1", workspaceId: 1 }],

      tasks: [
        {
          id: 1,
          title: "Task 1",
          status: TaskStatus.active,
          deadline: new Date(),
          categoryId: 1,
          projectId: 1,
          workspaceId: 1,
          creatorId: "user-1",
          assigneeId: "user-1",
        },
        {
          id: 2,
          title: "Task 2",
          status: TaskStatus.active,
          deadline: new Date(),
          categoryId: 1,
          projectId: 1,
          workspaceId: 1,
          creatorId: "user-1",
          assigneeId: "user-2",
        },
        {
          id: 3,
          title: "Task 3",
          status: TaskStatus.active,
          deadline: new Date(),
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
  });

  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.signIn("owner@example.com", "12345abc");
    cy.visit("/en");
  });

  it("search all users when no query is provided", () => {
    cy.getByData("search-modal-trigger").click();

    const expectedUsers = [
      { name: "John Doe", email: "owner@example.com" },
      { name: "Sarah Jenkins", email: "manager@example.com" },
      { name: "Michael Chen", email: "user@example.com" },
      { name: "Kevin Lee", email: "guest@example.com" },
      { name: "Bob Smith", email: "manager-empty@example.com" },
    ];

    cy.getByData("search-list-item")
      .should("have.length", expectedUsers.length)
      .each(($el, index) => {
        cy.wrap($el).should("contain", expectedUsers[index].name);
        cy.wrap($el).should("contain", expectedUsers[index].email);
      });
  });

  it("search users when they match the query 'en'", () => {
    cy.getByData("search-modal-trigger").click();
    cy.get("input[name=search]").type("en");

    const expectedUsers = [
      { name: "Sarah Jenkins", email: "manager@example.com" },
      { name: "Michael Chen", email: "user@example.com" },
    ];

    cy.getByData("search-list-item")
      .should("have.length", expectedUsers.length)
      .each(($el, index) => {
        cy.wrap($el).should("contain", expectedUsers[index].name);
        cy.wrap($el).should("contain", expectedUsers[index].email);
      });
  });

  it("navigate through search tabs: tasks, projects, and users", () => {
    cy.getByData("search-modal-trigger").click();

    cy.getByData("tasks-button").click();
    const expectedTasks = [
      { title: "Task 1" },
      { title: "Task 2" },
      { title: "Task 3" },
    ];

    cy.getByData("search-list-item")
      .should("have.length", expectedTasks.length)
      .each(($el, index) => {
        cy.wrap($el).should("contain", expectedTasks[index].title);
      });

    cy.getByData("projects-button").click();
    const expectedProjects = [{ title: "Project 1" }, { title: "Project 2" }];

    cy.getByData("search-list-item")
      .should("have.length", expectedProjects.length)
      .each(($el, index) => {
        cy.wrap($el).should("contain", expectedProjects[index].title);
      });

    cy.getByData("users-button").click();
    cy.getByData("search-list-item").should("have.length", 5);
  });
});
