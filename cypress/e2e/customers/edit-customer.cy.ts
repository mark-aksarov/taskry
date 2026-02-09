import {
  users,
  accounts,
  positions,
  companies,
  customers,
  workspaces,
} from "@/prisma/test-utils/data";

describe("Customer editing", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      workspaces,
      positions,
      users,
      accounts,
      companies,
      customers,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
  });

  it("updates a customer successfully", () => {
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/customers");

    cy.getByData("customer-item-1-action-menu-trigger").click();
    cy.getMenuItem("edit").click();

    cy.fillCustomerForm({
      fullName: "Updated Customer Name",
      email: "updated-customer@test.com",
      bio: "Updated Customer Bio",
      publicLink: "https://example.com/updated-customer",
      phoneNumber: "+654321",
      companyKey: "",
    });

    cy.get('button[type="submit"]').click();

    cy.getByData("customers-list").within(() => {
      cy.contains("Updated Customer Name");
      cy.contains("updated-customer@test.com");
      cy.contains("+654321");
      cy.contains("https://example.com/updated-customer");
      cy.contains("No company");
    });
  });

  it("pre-fills customer form with default values", () => {
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/customers");

    cy.getByData("customer-item-1-action-menu-trigger").click();
    cy.getMenuItem("edit").click();

    cy.get("input[name=email]").should("have.value", "customer-1@test.com");
    cy.get("input[name=fullName]").should("have.value", "Customer 1");
    cy.get("textarea[name=bio]").should("have.value", "Customer 1 bio");
    cy.get("input[name=publicLink]").should(
      "have.value",
      "https://example.com/customer-1",
    );
    cy.get("input[name=phoneNumber]").should("have.value", "123-456-7890");
    cy.get("select[name=companyId]").should("have.value", "1");
  });

  describe("edit customer access control", () => {
    const allowedUsers = [
      { role: "owner", id: "user-1" },
      { role: "user", id: "user-2" },
    ] as const;

    describe("from customers list", () => {
      allowedUsers.forEach((user) => {
        it(`allows ${user.role} to open edit modal`, () => {
          cy.signIn(`${user.id}@test.com`, "12345abc");
          cy.visit("/en/customers");

          cy.getByData("customer-item-1-action-menu-trigger").click();
          cy.getMenuItem("edit").click();

          cy.getByData("edit-customer-modal").should("be.visible");
        });
      });

      it("blocks guest from editing customer", () => {
        cy.signIn("user-3@test.com", "12345abc");
        cy.visit("/en/customers");

        cy.getByData("customer-item-1-action-menu-trigger").click();
        cy.getMenuItem("edit").click();

        cy.getByData("guest-mode-modal").should("be.visible");
      });
    });

    describe("from customer details page", () => {
      allowedUsers.forEach((user) => {
        it(`allows ${user.role} to open edit modal`, () => {
          cy.signIn(`${user.id}@test.com`, "12345abc");
          cy.visit("/en/customers/1");

          cy.getByData("edit-customer-button").filter(":visible").click();
          cy.getByData("edit-customer-modal").should("be.visible");
        });
      });

      it("blocks guest from editing customer", () => {
        cy.signIn("user-3@test.com", "12345abc");
        cy.visit("/en/customers/1");

        cy.getByData("edit-customer-button").filter(":visible").click();
        cy.getByData("guest-mode-modal").should("be.visible");
      });
    });
  });
});
