import {
  users,
  accounts,
  positions,
  workspaces,
} from "@/prisma/seed/test-data";
import { TestSeedPayload } from "@/prisma/test-seed";

describe("sort customers", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload: TestSeedPayload = {
      workspaces,
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
        {
          id: 3,
          name: "Company C",
          workspaceId: 1,
        },
      ],
      customers: [
        {
          id: 1,
          fullName: "Customer C",
          email: "customer-1@test.com",
          workspaceId: 1,
          companyId: 3,
        },
        {
          id: 2,
          fullName: "Customer B",
          email: "customer-2@test.com",
          workspaceId: 1,
          companyId: 1,
        },
        {
          id: 3,
          fullName: "Customer A",
          email: "customer-3@test.com",
          workspaceId: 1,
          companyId: 2,
        },
      ],
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/customers");
  });

  it("sort by full name", () => {
    cy.getByData("customers-sorting-menu-trigger-large").click();
    cy.getMenuItem("fullName").click();

    cy.getByData("customer-list-item").eq(0).should("contain", "Customer A");
    cy.getByData("customer-list-item").eq(1).should("contain", "Customer B");
    cy.getByData("customer-list-item").eq(2).should("contain", "Customer C");
  });

  it("sort by company", () => {
    cy.getByData("customers-sorting-menu-trigger-large").click();
    cy.getMenuItem("company").click();

    cy.getByData("customer-list-item").eq(0).should("contain", "Customer B");
    cy.getByData("customer-list-item").eq(1).should("contain", "Customer A");
    cy.getByData("customer-list-item").eq(2).should("contain", "Customer C");
  });
});
