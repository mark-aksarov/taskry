import {
  users,
  accounts,
  positions,
  workspaces,
} from "@/prisma/test-utils/data";

describe("User bio updating", () => {
  beforeEach(() => {
    const payload = {
      workspaces,
      users,
      accounts,
      positions,
    };

    cy.viewport(1440, 900);
    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/profile");
  });

  it("updates a user bio successfully", () => {
    cy.getByData("update-user-bio-edit-button").filter(":visible").click();
    cy.getByData("user-bio-field").contains("user 1 bio");
    cy.getByData("user-bio-field").clear().type("Updated User Bio");
    cy.get('button[type="submit"]').click();
    cy.getByData("user-bio-detail-info").contains("Updated User Bio");
  });

  it("shows empty bio message when bio is cleared", () => {
    cy.getByData("update-user-bio-edit-button").filter(":visible").click();
    cy.getByData("user-bio-field").clear();
    cy.get('button[type="submit"]').click();
    cy.getByData("user-bio-detail-info").contains(
      "This user hasn’t written a bio yet",
    );
  });
});
