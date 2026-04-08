import { users, accounts, workspaces } from "@/prisma/test-utils/data";

describe("User editing", () => {
  beforeEach(() => {
    const payload = {
      workspaces,
      users,
      accounts,
      positions: [
        {
          id: 1,
          name: "Position 1",
          workspaceId: 1,
        },
        {
          id: 2,
          name: "Position 2",
          workspaceId: 2,
        },
        {
          id: 3,
          name: "Position 3",
          workspaceId: 1,
        },
      ],
    };

    cy.viewport(1440, 900);
    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/team");
  });

  it("updates a user successfully", () => {
    cy.getByData("user-item-action-menu-trigger", "user-1").click();
    cy.getMenuItem("edit").click();

    cy.fillUpdateUserForm({
      fullName: "Updated User Full Name",
      bio: "Updated User Bio",
      birthdate: { day: "01", month: "02", year: "1999" },
      phoneNumber: "+1234567890",
      publicLink: "https://example.com/updated-user",
      address: "Updated User Address",
      positionKey: "3",
    });

    cy.get('button[type="submit"]').click();

    cy.getByData("user-list-item", "user-1").within(() => {
      cy.contains("Updated User Full Name");
      cy.contains("+1234567890");
      cy.contains("https://example.com/updated-user");
      cy.contains("Position 3");
    });
  });

  it("pre-fills user form with default values", () => {
    cy.getByData("user-item-action-menu-trigger", "user-1").click();
    cy.getMenuItem("edit").click();

    cy.getByData("user-full-name-field").within(() =>
      cy.get("input").should("have.value", "User 1"),
    );
    cy.getByData("user-bio-field").within(() =>
      cy.get("textarea").should("have.value", "user 1 bio"),
    );
    cy.getByData("user-phone-number-field").within(() =>
      cy.get("input").should("have.value", "phone 1"),
    );
    cy.getByData("user-public-link-field").within(() =>
      cy.get("input").should("have.value", "https://example.com/user-1"),
    );
    cy.getByData("user-address-field").within(() =>
      cy.get("input").should("have.value", "address user 1"),
    );
    cy.getByData("position-select").within(() =>
      cy.get("select").should("have.value", "1"),
    );
  });

  it("updates a user when optional fields are empty", () => {
    cy.getByData("user-item-action-menu-trigger", "user-1").click();
    cy.getMenuItem("edit").click();

    cy.fillUpdateUserForm({
      fullName: "Updated User Full Name",
      positionKey: "",
    });

    cy.get('button[type="submit"]').click();

    cy.getByData("user-list-item", "user-1").within(() => {
      cy.contains("Updated User Full Name");
      cy.contains("No phone");
      cy.contains("No public link");
      cy.contains("No position");
    });
  });
});
