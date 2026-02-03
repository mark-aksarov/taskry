import { E2ESeedPayload } from "@/prisma/e2e/types";

describe("edit a new user", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload: E2ESeedPayload = {
      users: [
        {
          id: "user-test",
          fullName: "User 1",
          bio: "User 1 bio",
          address: "User 1 address",
          birthdate: new Date("2000-01-01"),
          role: "user",
          email: "user-test@example.com",
          emailVerified: true,
          imageUrl: null,
          phoneNumber: "+123456",
          publicLink: "https://example.com/public-link",
          positionId: 1,
          workspaceId: 1,
        },
      ],
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("owner@example.com", "12345abc");
    cy.visit("/en/team");
  });

  it("can edit a user", () => {
    cy.getByData("user-item-user-test-action-menu-trigger").click();
    cy.getMenuItem("edit").click();

    // fill form
    cy.get('input[name="fullName"]').clear().type("Updated User Name");
    cy.get('textarea[name="bio"]').clear().type("Updated User Bio");
    cy.setDatePickerDate("birthdate-date-picker", "01", "01", "1999");
    cy.get('input[name="phoneNumber"]').clear().type("+654321");
    cy.get('input[name="publicLink"]')
      .clear()
      .type("https://example.com/updated-public-link");
    cy.get('input[name="address"]').clear().type("Updated User Address");
    cy.getByData("position-select").click();
    cy.getSelectOption("3").click();

    // submit
    cy.get('button[type="submit"]').click();

    // assert
    cy.getByData("users-list").within(() => {
      cy.contains("Updated User Name");
      cy.contains("Developer");
      cy.contains("https://example.com/updated-public-link");
      cy.contains("CEO");
      cy.contains("+654321");
    });
  });
});
