import {
  users,
  accounts,
  positions,
  workspaces,
} from "@/prisma/test-utils/data";

describe("edit an user", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.task("db:reset");
    cy.task("db:seed", {
      workspaces,
      users,
      accounts,
      positions: [
        {
          name: "Position 1",
          workspaceId: 1,
        },
        {
          name: "Position 2",
          workspaceId: 1,
        },
        {
          name: "Position 3",
          workspaceId: 1,
        },
      ],
    });
  });

  const userData = {
    fullName: "Updated User Name",
    bio: "Updated User Bio",
    birthdate: { day: "01", month: "01", year: "1999" },
    phoneNumber: "+654321",
    publicLink: "https://example.com/updated-public-link",
    address: "Updated User Address",
    positionKey: "3",
  };

  describe("team page", () => {
    it("edit an user", () => {
      cy.signIn("user-1@test.com", "12345abc");
      cy.visit("/en/team");

      cy.getByData("user-item-user-1-action-menu-trigger").click();
      cy.getMenuItem("edit").click();

      cy.fillEditUserForm(userData);

      // assert
      cy.getByData("users-list").within(() => {
        cy.contains("Updated User Name");
        cy.contains("https://example.com/updated-public-link");
        cy.contains("Position 3");
        cy.contains("+654321");
      });
    });

    describe("access control (RBAC)", () => {
      it("user with 'owner' role can edit another user", () => {
        cy.signIn("user-1@test.com", "12345abc");
        cy.visit("/en/team");
        cy.getByData("user-item-user-2-action-menu-trigger").click();
        cy.getMenuItem("edit").click();
        cy.getByData("edit-user-modal").should("be.visible");
      });

      it("user with 'user' role can't edit user", () => {
        cy.signIn("user-2@test.com", "12345abc");
        cy.visit("/en/team");
        cy.getByData("user-item-user-2-action-menu-trigger").should(
          "not.exist",
        );
      });

      it("show a restriction modal when a 'guest' attempts to edit user", () => {
        cy.signIn("user-3@test.com", "12345abc");
        cy.visit("/en/team");
        cy.getByData("user-item-user-2-action-menu-trigger").click();
        cy.getMenuItem("edit").click();
        cy.getByData("guest-mode-modal").should("be.visible");
      });
    });
  });

  describe("user detail page", () => {
    it("edit an user", () => {
      cy.signIn("user-1@test.com", "12345abc");
      cy.visit("/en/team/user-1");

      cy.getByData("edit-user-button").filter(":visible").click();

      cy.fillEditUserForm(userData);

      // assert
      cy.getByData("user-card").within(() => {
        cy.contains("Updated User Name");
        cy.contains("Updated User Bio");
        cy.contains("Position 3");
        cy.contains("1999");
        cy.contains("https://example.com/updated-public-link");
        cy.contains("Updated User Address");
        cy.contains("+654321");
      });
    });

    describe("access control (RBAC)", () => {
      it("user with 'owner' role can edit another user", () => {
        cy.signIn("user-1@test.com", "12345abc");
        cy.visit("/en/team/user-2");
        cy.getByData("edit-user-button").filter(":visible").click();
        cy.getByData("edit-user-modal").should("be.visible");
      });

      it("user with 'user' role can edit himself", () => {
        cy.signIn("user-2@test.com", "12345abc");
        cy.visit("/en/team/user-2");
        cy.getByData("edit-user-button").filter(":visible").click();
        cy.getByData("edit-user-modal").should("be.visible");
      });

      it("user with 'user' role can't edit another user", () => {
        cy.signIn("user-2@test.com", "12345abc");
        cy.visit("/en/team/user-1");
        cy.getByData("profile-actions").should("not.exist");
      });

      it("show a restriction modal when a 'guest' attempts to edit user", () => {
        cy.signIn("user-3@test.com", "12345abc");
        cy.visit("/en/profile");
        cy.getByData("edit-user-button").filter(":visible").click();
        cy.getByData("guest-mode-modal").should("be.visible");
      });
    });
  });

  describe("profile page", () => {
    it("edit an user", () => {
      cy.signIn("user-1@test.com", "12345abc");
      cy.visit("/en/profile");

      cy.getByData("edit-user-button").filter(":visible").click();

      cy.fillEditUserForm(userData);

      // assert
      cy.getByData("user-card").within(() => {
        cy.contains("Updated User Name");
        cy.contains("Updated User Bio");
        cy.contains("Position 3");
        cy.contains("1999");
        cy.contains("https://example.com/updated-public-link");
        cy.contains("Updated User Address");
        cy.contains("+654321");
      });
    });

    describe("access control (RBAC)", () => {
      it("user with 'owner' role can edit profile", () => {
        cy.signIn("user-1@test.com", "12345abc");
        cy.visit("/en/profile");
        cy.getByData("edit-user-button").filter(":visible").click();
        cy.getByData("edit-user-modal").should("be.visible");
      });

      it("user with 'user' role can edit profile", () => {
        cy.signIn("user-2@test.com", "12345abc");
        cy.visit("/en/profile");
        cy.getByData("edit-user-button").filter(":visible").click();
        cy.getByData("edit-user-modal").should("be.visible");
      });

      it("show a restriction modal when a 'guest' attempts to edit profile", () => {
        cy.signIn("user-3@test.com", "12345abc");
        cy.visit("/en/profile");
        cy.getByData("edit-user-button").filter(":visible").click();
        cy.getByData("guest-mode-modal").should("be.visible");
      });
    });
  });
});
