import {
  users,
  accounts,
  positions,
  workspaces,
} from "@/prisma/test-utils/data";

describe("User birthdate updating", () => {
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

  it("updates a user birthdate successfully", () => {
    cy.getByData("update-user-birthdate-edit-button")
      .filter(":visible")
      .click();
    cy.setDatePickerDate("user-birthdate-date-picker", "01", "02", "1234");
    cy.get('button[type="submit"]').click();
    cy.getByData("user-birthdate-detail-info").contains("1234");
  });

  it("shows empty birthdate message when birthdate is cleared", () => {
    cy.getByData("update-user-birthdate-edit-button")
      .filter(":visible")
      .click();
    cy.setDatePickerDate("user-birthdate-date-picker", "", "", "");
    cy.get('button[type="submit"]').click();
    cy.getByData("user-birthdate-detail-info").contains("No birthdate");
  });
});
