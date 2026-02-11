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
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/customers");
  });

  it("updates a customer successfully", () => {
    cy.getByData("customer-item-action-menu-trigger", "1").click();
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
    cy.getByData("customer-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.getByData("customer-full-name-field").within(() =>
      cy.get("input").should("have.value", "Customer 1"),
    );
    cy.getByData("customer-bio-field").within(() =>
      cy.get("textarea").should("have.value", "Customer 1 bio"),
    );
    cy.getByData("customer-email-field").within(() =>
      cy.get("input").should("have.value", "customer-1@test.com"),
    );
    cy.getByData("customer-phone-number-field").within(() =>
      cy.get("input").should("have.value", "123-456-7890"),
    );
    cy.getByData("customer-public-link-field").within(() =>
      cy.get("input").should("have.value", "https://example.com/customer-1"),
    );
    cy.getByData("customer-company-select").within(() =>
      cy.get("select").should("have.value", "1"),
    );
  });

  it.only("updates a customer when optional fields are empty", () => {
    cy.getByData("customer-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.fillCustomerForm({
      fullName: "Updated Customer Name",
      email: "updated-customer@test.com",
      companyKey: "",
    });

    cy.get('button[type="submit"]').click();

    cy.getByData("customers-list").within(() => {
      cy.contains("Updated Customer Name");
      cy.contains("updated-customer@test.com");
      cy.contains("No phone number");
      cy.contains("No public link");
      cy.contains("No company");
    });
  });
});
