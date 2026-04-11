import {
  users,
  accounts,
  positions,
  workspaces,
} from "@/prisma/test-utils/data";

describe("User address updating", () => {
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

  it("updates a user address successfully", () => {
    cy.getByData("update-user-address-edit-button").filter(":visible").click();
    cy.getByData("user-address-field").within(() =>
      cy.get("input").should("have.value", "address user 1"),
    );
    cy.getByData("user-address-field").clear().type("Updated User Address");
    cy.get('button[type="submit"]').click();
    cy.getByData("user-address-detail-info").contains("Updated User Address");
  });

  it("shows empty address message when address is cleared", () => {
    cy.getByData("update-user-address-edit-button").filter(":visible").click();
    cy.getByData("user-address-field").clear();
    cy.get('button[type="submit"]').click();
    cy.getByData("user-address-detail-info").contains("No address");
  });
});
