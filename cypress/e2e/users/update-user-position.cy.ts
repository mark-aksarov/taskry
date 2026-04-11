import {
  users,
  accounts,
  positions,
  workspaces,
} from "@/prisma/test-utils/data";

describe("User position updating", () => {
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
    cy.visit("/en/profile");
  });

  it("updates a user position successfully", () => {
    cy.getByData("update-user-position-edit-button").filter(":visible").click();
    cy.getByData("position-select").within(() =>
      cy.get("select").should("have.value", "1"),
    );
    cy.getByData("position-select").click();
    cy.getSelectOption("3").click();
    cy.get('button[type="submit"]').click();
    cy.getByData("user-position-detail-info").contains("Position 3");
  });

  it("shows empty position message when position is cleared", () => {
    cy.getByData("update-user-position-edit-button").filter(":visible").click();
    cy.getByData("position-select").click();
    cy.getSelectOption("").click();
    cy.get('button[type="submit"]').click();
    cy.getByData("user-position-detail-info").contains(
      "Position not specified",
    );
  });
});
