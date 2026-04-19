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
    cy.getByData("customers-empty-section-create-button")
      .filter(":visible")
      .click();

    cy.fillCustomerForm(customerData);
    cy.get('button[type="submit"]').click();

    cy.getByData("entity-grid").within(() => {
      cy.contains(customerData.fullName);
      cy.contains(customerData.email);
      cy.contains(customerData.phoneNumber);
      cy.contains(customerData.publicLink);
      cy.contains("Company 1");
    });
  });

  it("shows validation errors and prevents submission with invalid data", () => {
    cy.getByData("customers-empty-section-create-button").click();

    cy.get('button[type="submit"]').click();

    cy.contains(/full name is required/i);
    cy.contains(/email is required/i);

    cy.getByData("customer-email-field").type("invalid email");
    cy.getByData("customer-public-link-field").clear().type("invalid url");
    cy.get('button[type="submit"]').click();

    cy.contains(/enter a valid email address/i);
    cy.contains(/please enter a valid url/i);
  });

  it("creates a customer when optional fields are empty", () => {
    cy.getByData("customers-empty-section-create-button").click();

    cy.fillCustomerForm({
      fullName: customerData.fullName,
      email: customerData.email,
    });

    cy.get('button[type="submit"]').click();

    cy.getByData("entity-grid").within(() => {
      cy.contains(customerData.fullName);
      cy.contains(customerData.email);
      cy.contains("No phone number");
      cy.contains("No public link");
      cy.contains("No company");
    });
  });
});
