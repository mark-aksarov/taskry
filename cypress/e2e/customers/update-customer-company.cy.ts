import {
  users,
  positions,
  customers,
  accounts,
  workspaces,
} from "@/prisma/test-utils/data";

describe("User company updating", () => {
  beforeEach(() => {
    const payload = {
      workspaces,
      users,
      positions,
      customers,
      accounts,
      companies: [
        {
          id: 1,
          name: "Company 1",
          workspaceId: 1,
        },
        {
          id: 2,
          name: "Company 2",
          workspaceId: 2,
        },
        {
          id: 3,
          name: "Company 3",
          workspaceId: 1,
        },
      ],
    };

    cy.viewport(414, 896);
    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/customers/1");
  });

  it("updates a customer company successfully", () => {
    cy.getByData("update-customer-company-edit-button")
      .filter(":visible")
      .click();
    cy.getByData("company-select").within(() =>
      cy.get("select").should("have.value", "1"),
    );
    cy.getByData("company-select").click();
    cy.getSelectOption("3").click();
    cy.get('button[type="submit"]').click();
    cy.getByData("customer-company-detail-info").contains("Company 3");
  });

  it("shows empty company message when company is cleared", () => {
    cy.getByData("update-customer-company-edit-button")
      .filter(":visible")
      .click();
    cy.getByData("company-select").click();
    cy.getSelectOption("").click();
    cy.get('button[type="submit"]').click();
    cy.getByData("customer-company-detail-info").contains(
      "Company not specified",
    );
  });
});
