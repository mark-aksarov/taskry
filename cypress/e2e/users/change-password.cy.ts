import {
  users,
  accounts,
  positions,
  workspaces,
} from "@/prisma/test-utils/data";

describe("change password of user", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
    cy.task("db:reset");
    cy.task("db:seed", {
      workspaces,
      users,
      accounts,
      positions,
    });
  });

  it("updates password and sign-in with new password", () => {
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/profile");

    cy.changePassword("new-password");

    // sign in with new password
    cy.signOutViaUI();
    cy.signIn("user-1@test.com", "new-password");
  });
});
