import {
  users,
  accounts,
  positions,
  workspaces,
} from "@/prisma/seed/test-data";
import { TestSeedPayload } from "@/prisma/test-seed";
import { ProjectStatus } from "@/generated/prisma/enums";

describe("filter clients", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload: TestSeedPayload = {
      users,
      accounts,
      positions,
      companies: [
        {
          id: 1,
          name: "Company A",
          workspaceId: 1,
        },
        {
          id: 2,
          name: "Company B",
          workspaceId: 1,
        },
      ],
      clients: [
        {
          id: 1,
          fullName: "Client A",
          email: "client-1@test.com",
          workspaceId: 1,
          companyId: 1,
        },
        {
          id: 2,
          fullName: "Client B",
          email: "client-2@test.com",
          workspaceId: 1,
          companyId: 2,
        },
        {
          id: 3,
          fullName: "Client C",
          email: "client-3@test.com",
          workspaceId: 1,
          companyId: 1,
        },
      ],
      projects: [
        {
          id: 1,
          title: "Project A",
          deadline: new Date("2030-01-01"),
          status: ProjectStatus.active,
          workspaceId: 1,
          clientId: 1,
        },
        {
          id: 2,
          title: "Project B",
          deadline: new Date("2030-01-01"),
          status: ProjectStatus.active,
          workspaceId: 1,
          clientId: 1,
        },
        {
          id: 3,
          title: "Project C",
          deadline: new Date("2022-01-01"),
          status: ProjectStatus.pending,
          workspaceId: 1,
          clientId: 2,
        },
      ],
      workspaces,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/clients");
  });

  it("filter clients with no active projects", () => {
    cy.getByData("client-filters-modal-trigger-large").click();

    cy.getByData("has-no-active-projects-switch").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("client-list-item").should("have.length", 2);
    cy.getByData("client-list-item", "2").should("exist");
    cy.getByData("client-list-item", "3").should("exist");

    cy.location("search").should("include", "hasNoActiveProjects=true");
  });

  it("filter clients with active projects", () => {
    cy.getByData("client-filters-modal-trigger-large").click();

    cy.getByData("has-active-projects-switch").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("client-list-item").should("have.length", 1);
    cy.getByData("client-list-item", "1").should("exist");

    cy.location("search").should("include", "hasActiveProjects=true");
  });

  it("filter clients with overdue projects", () => {
    cy.getByData("client-filters-modal-trigger-large").click();

    cy.getByData("has-overdue-projects-switch").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("client-list-item").should("have.length", 1);
    cy.getByData("client-list-item", "2").should("exist");

    cy.location("search").should("include", "hasOverdueProjects=true");
  });

  it("filter by company", () => {
    cy.getByData("client-filters-modal-trigger-large").click();

    cy.getByData("company-checkbox", "1").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("client-list-item").should("have.length", 2);
    cy.getByData("client-list-item", "1").should("exist");
    cy.getByData("client-list-item", "3").should("exist");

    cy.location("search").should("include", "companyIds=1");
  });
});
