import {
  users,
  accounts,
  positions,
  workspaces,
} from "@/prisma/test-utils/data";
import { ProjectStatus } from "@/generated/prisma/enums";
import { E2ESeedPayload } from "@/prisma/test-utils/types";

describe("filter customers", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload: E2ESeedPayload = {
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
      customers: [
        {
          id: 1,
          fullName: "Customer A",
          email: "customer-1@test.com",
          workspaceId: 1,
          companyId: 1,
        },
        {
          id: 2,
          fullName: "Customer B",
          email: "customer-2@test.com",
          workspaceId: 1,
          companyId: 2,
        },
        {
          id: 3,
          fullName: "Customer C",
          email: "customer-3@test.com",
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
          customerId: 1,
        },
        {
          id: 2,
          title: "Project B",
          deadline: new Date("2030-01-01"),
          status: ProjectStatus.active,
          workspaceId: 1,
          customerId: 1,
        },
        {
          id: 3,
          title: "Project C",
          deadline: new Date("2022-01-01"),
          status: ProjectStatus.pending,
          workspaceId: 1,
          customerId: 2,
        },
      ],
      workspaces,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/customers");
  });

  it("filter customers with no active projects", () => {
    cy.getByData("customer-filters-modal-trigger-large").click();

    cy.getByData("has-no-active-projects-switch").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("customer-list-item").should("have.length", 2);
    cy.getByData("customer-list-item", "2").should("exist");
    cy.getByData("customer-list-item", "3").should("exist");

    cy.location("search").should("include", "hasNoActiveProjects=true");
  });

  it("filter customers with active projects", () => {
    cy.getByData("customer-filters-modal-trigger-large").click();

    cy.getByData("has-active-projects-switch").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("customer-list-item").should("have.length", 1);
    cy.getByData("customer-list-item", "1").should("exist");

    cy.location("search").should("include", "hasActiveProjects=true");
  });

  it("filter customers with overdue projects", () => {
    cy.getByData("customer-filters-modal-trigger-large").click();

    cy.getByData("has-overdue-projects-switch").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("customer-list-item").should("have.length", 1);
    cy.getByData("customer-list-item", "2").should("exist");

    cy.location("search").should("include", "hasOverdueProjects=true");
  });

  it("filter by company", () => {
    cy.getByData("customer-filters-modal-trigger-large").click();

    cy.getByData("company-checkbox", "1").click();
    cy.get('button[type="submit"]').click();

    cy.getByData("customer-list-item").should("have.length", 2);
    cy.getByData("customer-list-item", "1").should("exist");
    cy.getByData("customer-list-item", "3").should("exist");

    cy.location("search").should("include", "companyIds=1");
  });
});
