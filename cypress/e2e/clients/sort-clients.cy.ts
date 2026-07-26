import {
  users,
  accounts,
  positions,
  organizations,
  members,
} from "@/prisma/seed/test-data";
import { TestSeedPayload } from "@/prisma/test-seed";

describe("sort clients", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload: TestSeedPayload = {
      organizations,
      members,
      users,
      accounts,
      positions,
      companies: [
        {
          id: 1,
          name: "Company A",
          organizationId: "org-1",
        },
        {
          id: 2,
          name: "Company B",
          organizationId: "org-1",
        },
        {
          id: 3,
          name: "Company C",
          organizationId: "org-1",
        },
      ],
      clients: [
        {
          id: 1,
          fullName: "Client C",
          email: "client-1@test.com",
          organizationId: "org-1",
          companyId: 3,
        },
        {
          id: 2,
          fullName: "Client B",
          email: "client-2@test.com",
          organizationId: "org-1",
          companyId: 1,
        },
        {
          id: 3,
          fullName: "Client A",
          email: "client-3@test.com",
          organizationId: "org-1",
          companyId: 2,
        },
      ],
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/clients");
  });

  it("sort by full name", () => {
    cy.getByData("clients-sorting-menu-trigger-large").click();
    cy.getMenuItem("fullName").click();

    cy.getByData("client-list-item").eq(0).should("contain", "Client A");
    cy.getByData("client-list-item").eq(1).should("contain", "Client B");
    cy.getByData("client-list-item").eq(2).should("contain", "Client C");
  });

  it("sort by company", () => {
    cy.getByData("clients-sorting-menu-trigger-large").click();
    cy.getMenuItem("company").click();

    cy.getByData("client-list-item").eq(0).should("contain", "Client B");
    cy.getByData("client-list-item").eq(1).should("contain", "Client A");
    cy.getByData("client-list-item").eq(2).should("contain", "Client C");
  });
});
