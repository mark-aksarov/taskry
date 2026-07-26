import { TestSeedPayload } from "@/prisma/test-seed";
import { accounts, organizations, members } from "@/prisma/seed/test-data";

describe("sort users", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload: TestSeedPayload = {
      organizations,
      accounts: [accounts[0]],
      positions: [
        { id: 1, name: "Position A", organizationId: "org-1" },
        { id: 2, name: "Position B", organizationId: "org-1" },
        { id: 3, name: "Position C", organizationId: "org-1" },
      ],
      users: [
        {
          id: "user-1",
          fullName: "User C",
          email: "user-1@test.com",
          emailVerified: true,
          positionId: 3,
        },
        {
          id: "user-2",
          fullName: "User B",
          email: "user-2@test.com",
          emailVerified: true,
          positionId: 1,
        },
        {
          id: "user-3",
          fullName: "User A",
          email: "user-3@test.com",
          emailVerified: true,
          positionId: 2,
        },
      ],
      members: [
        {
          id: "member-1",
          userId: "user-1",
          organizationId: "org-1",
          role: "owner",
          createdAt: new Date(),
        },
        {
          id: "member-2",
          userId: "user-2",
          organizationId: "org-1",
          role: "member",
          createdAt: new Date(),
        },
        {
          id: "member-3",
          userId: "user-3",
          organizationId: "org-1",
          role: "member",
          createdAt: new Date(),
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
