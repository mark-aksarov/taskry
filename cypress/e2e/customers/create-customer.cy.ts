import {
  users,
  accounts,
  positions,
  companies,
  workspaces,
} from "@/prisma/test-utils/data";

describe("Customer creation", () => {
  const customerData = {
    fullName: "Created Customer Name",
    bio: "Created Customer Bio",
    email: "created-customer@test.com",
    phoneNumber: "+654321",
    publicLink: "https://example.com/created-customer",
    companyKey: "1",
  };

  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      workspaces,
      positions,
      users,
      accounts,
      companies,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);

    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/customers");
  });

  it("creates a new customer with valid data", () => {
    cy.getByData("customer-toolbar-create-new-menu-trigger")
      .filter(":visible")
      .click();
    cy.getMenuItem("customer").click();

    cy.fillCustomerForm(customerData);
    cy.get('button[type="submit"]').click();

    cy.getByData("customers-list").within(() => {
      cy.contains(customerData.fullName);
      cy.contains(customerData.email);
      cy.contains(customerData.phoneNumber);
      cy.contains(customerData.publicLink);
      cy.contains("Company 1");
    });
  });

  it("shows validation errors and prevents submission with invalid data", () => {
    cy.getByData("customer-toolbar-create-new-menu-trigger")
      .filter(":visible")
      .click();
    cy.getMenuItem("customer").click();

    cy.get('button[type="submit"]').click();

    cy.contains(/full name is required/i).should("be.visible");
    cy.contains(/email is required/i).should("be.visible");

    cy.get("input[name=email]").type("invalid email");
    cy.get("input[name=publicLink]").clear().type("invalid url");
    cy.get('button[type="submit"]').click();

    cy.contains(/enter a valid email address/i).should("be.visible");
    cy.contains(/please enter a valid url/i).should("be.visible");
  });

  it("creates a customer when optional fields are empty", () => {
    cy.getByData("customer-toolbar-create-new-menu-trigger")
      .filter(":visible")
      .click();
    cy.getMenuItem("customer").click();

    cy.fillCustomerForm({
      fullName: customerData.fullName,
      email: customerData.email,
    });

    cy.get('button[type="submit"]').click();

    cy.getByData("customers-list").within(() => {
      cy.contains(customerData.fullName);
      cy.contains(customerData.email);
      cy.contains("No phone number");
      cy.contains("No public link");
      cy.contains("No company");
    });
  });
});
