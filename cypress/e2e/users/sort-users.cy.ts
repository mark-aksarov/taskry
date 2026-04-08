import { accounts, workspaces } from "@/prisma/test-utils/data";
import { E2ESeedPayload } from "@/prisma/test-utils/types";

describe("sort users", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload: E2ESeedPayload = {
      workspaces,
      accounts: [accounts[0]],
      positions: [
        { id: 1, name: "Position A", workspaceId: 1 },
        { id: 2, name: "Position B", workspaceId: 1 },
        { id: 3, name: "Position C", workspaceId: 1 },
      ],
      users: [
        {
          id: "user-1",
          fullName: "User C",
          email: "user-1@test.com",
          emailVerified: true,
          role: "owner",
          positionId: 3,
          workspaceId: 1,
        },
        {
          id: "user-2",
          fullName: "User B",
          email: "user-2@test.com",
          emailVerified: true,
          role: "user",
          positionId: 1,
          workspaceId: 1,
        },
        {
          id: "user-3",
          fullName: "User A",
          email: "user-3@test.com",
          emailVerified: true,
          role: "user",
          positionId: 2,
          workspaceId: 1,
        },
      ],
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/team");
  });

  it("sort by full name", () => {
    cy.getByData("users-sorting-menu-trigger-large").click();
    cy.getMenuItem("fullName").click();

    cy.getByData("user-list-item").eq(0).should("contain", "User A");
    cy.getByData("user-list-item").eq(1).should("contain", "User B");
    cy.getByData("user-list-item").eq(2).should("contain", "User C");
  });

  it("sort by position", () => {
    cy.getByData("users-sorting-menu-trigger-large").click();
    cy.getMenuItem("position").click();

    cy.getByData("user-list-item").eq(0).should("contain", "User B");
    cy.getByData("user-list-item").eq(1).should("contain", "User A");
    cy.getByData("user-list-item").eq(2).should("contain", "User C");
  });
});
