import { E2ESeedPayload } from "@/prisma/e2e/types";

describe("creates a new customer", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload: E2ESeedPayload = {
      companies: [{ id: 1, name: "Company 1", workspaceId: 1 }],
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("owner@example.com", "12345abc");
    cy.visit("/en/customers");
  });

  const customerData = {
    fullName: "Created Customer Name",
    bio: "Created Customer Bio",
    email: "created-customer@test.com",
    phoneNumber: "+654321",
    publicLink: "https://example.com/created-customer",
    companyKey: "1",
  };

  it.only("should successfully create a new customer when all fields are valid", () => {
    cy.getByData("customer-toolbar-create-new-menu-trigger").click();
    cy.getMenuItem("customer").click();

    cy.fillCustomerForm(customerData);
    cy.get('button[type="submit"]').click();

    // assert
    cy.getByData("customers-list").within(() => {
      cy.contains(customerData.fullName);
      cy.contains(customerData.email);
      cy.contains(customerData.phoneNumber);
      cy.contains(customerData.publicLink);
      cy.contains("Company 1");
    });
  });

  it("should display validation errors and prevent submission with invalid data", () => {
    cy.getByData("customer-toolbar-create-new-menu-trigger").click();
    cy.getMenuItem("customer").click();
    cy.get('button[type="submit"]').click();

    // Shows "required" errors
    cy.contains(/full name is required/i).should("be.visible");
    cy.contains(/email is required/i).should("be.visible");

    // Fill in invalid data
    cy.get("input[name=email]").type("invalid email");
    cy.get("input[name=publicLink]").clear().type("invalid url");
    cy.get('button[type="submit"]').click();

    // Shows "format" errors
    cy.contains(/enter a valid email address/i).should("be.visible");
    cy.contains(/please enter a valid url/i).should("be.visible");
  });

  it("should successfully save the profile when optional fields are left empty", () => {
    cy.getByData("customer-toolbar-create-new-menu-trigger").click();
    cy.getMenuItem("customer").click();
    cy.get('button[type="submit"]').click();

    cy.fillCustomerForm({
      fullName: customerData.fullName,
      email: customerData.email,
    });
    cy.get('button[type="submit"]').click();

    // assert
    cy.getByData("customers-list").within(() => {
      cy.contains("Created Customer Name");
      cy.contains("created-customer@test.com");
      cy.contains("No phone number");
      cy.contains("No public link");
      cy.contains("No company");
    });
  });

  describe("access control (RBAC)", () => {
    it("allows a user with 'owner' role to open the create modal", () => {
      cy.signIn("owner@example.com", "12345abc");
      cy.visit("/en/customers");

      cy.getByData("customer-toolbar-create-new-menu-trigger").click();
      cy.getMenuItem("customer").click();
      cy.getByData("new-customer-modal").should("be.visible");
    });

    it("allows a user with 'user' role to open the create modal", () => {
      cy.signIn("user@example.com", "12345abc");
      cy.visit("/en/customers");

      cy.getByData("customer-toolbar-create-new-menu-trigger").click();
      cy.getMenuItem("customer").click();
      cy.getByData("new-customer-modal").should("be.visible");
    });

    it("shows a restriction modal when a 'guest' attempts to create", () => {
      cy.signIn("guest@example.com", "12345abc");
      cy.visit("/en/customers");

      cy.getByData("customer-toolbar-create-new-menu-trigger").click();
      cy.getMenuItem("customer").click();
      cy.getByData("guest-mode-modal").should("be.visible");
    });
  });
});
