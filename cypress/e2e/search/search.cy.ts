import {
  users,
  accounts,
  positions,
  workspaces,
  companies,
  projectCategories,
  projects,
  taskCategories,
} from "@/prisma/test-utils/data";

import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

describe("search", () => {
  before(() => {
    const payload = {
      users,
      accounts,
      positions,
      workspaces,
      companies,
      projectCategories,
      projects,
      taskCategories,

      customers: [
        {
          id: 1,
          email: "customer-1@example.com",
          fullName: "Customer 1",
          companyId: 1,
          workspaceId: 1,
        },
        {
          id: 2,
          email: "customer-2@example.com",
          fullName: "Customer 2",
          companyId: 1,
          workspaceId: 1,
        },
        {
          id: 3,
          email: "customer-3@example.com",
          fullName: "Customer 3",
          companyId: 1,
          workspaceId: 1,
        },
      ],
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
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en");
  });

  it("search all users when no query is provided", () => {
    cy.getByData("search-modal-trigger").click();

    const expectedUsers = [
      { name: "User 1", email: "user-1@test.com" },
      { name: "User 2", email: "user-2@test.com" },
      { name: "User 3", email: "user-3@test.com" },
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
    cy.get("input[name=search]").type("er 2");

    const expectedUsers = [{ name: "User 2", email: "user-2@test.com" }];

    cy.getByData("search-list-item")
      .should("have.length", expectedUsers.length)
      .each(($el, index) => {
        cy.wrap($el).should("contain", expectedUsers[index].name);
        cy.wrap($el).should("contain", expectedUsers[index].email);
      });
  });

  it("navigate through search tabs: tasks, projects, users, and customers", () => {
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

    cy.getByData("customers-button").click();
    const expectedCustomers = [
      { fullName: "Customer 1" },
      { fullName: "Customer 2" },
      { fullName: "Customer 3" },
    ];

    cy.getByData("search-list-item")
      .should("have.length", expectedCustomers.length)
      .each(($el, index) => {
        cy.wrap($el).should("contain", expectedCustomers[index].fullName);
      });

    cy.getByData("users-button").click();
    cy.getByData("search-list-item").should("have.length", 3);
  });

  it("navigate through links", () => {
    cy.getByData("search-modal-trigger").click();
    cy.getByData("search-list-item").first().click();
    cy.location("pathname").should("contain", "/team/user-1");

    cy.getByData("search-modal").should("not.exist");
    cy.getByData("search-modal-trigger").click();
    cy.getByData("tasks-button").click();
    cy.getByData("search-list-item").first().click();
    cy.location("pathname").should("contain", "/tasks/1");

    cy.getByData("search-modal").should("not.exist");
    cy.getByData("search-modal-trigger").click();
    cy.getByData("projects-button").click();
    cy.getByData("search-list-item").first().click();
    cy.location("pathname").should("contain", "/projects/1");

    cy.getByData("search-modal").should("not.exist");
    cy.getByData("search-modal-trigger").click();
    cy.getByData("customers-button").click();
    cy.getByData("search-list-item").first().click();
    cy.location("pathname").should("contain", "/customers/1");
  });
});
