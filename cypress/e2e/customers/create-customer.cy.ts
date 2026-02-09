import { E2ESeedPayload } from "@/prisma/e2e/types";

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

    const payload: E2ESeedPayload = {
      companies: [{ id: 1, name: "Company 1", workspaceId: 1 }],
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
  });

  describe("customers page", () => {
    beforeEach(() => {
      cy.signIn("owner@example.com", "12345abc");
      cy.visit("/en/customers");

      cy.getByData("customer-toolbar-create-new-menu-trigger")
        .filter(":visible")
        .click();
      cy.getMenuItem("customer").click();
    });

    it("creates a new customer with valid data", () => {
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

  describe("create customer access control", () => {
    const allowedRoles = ["owner", "user"] as const;

    describe("customers page", () => {
      allowedRoles.forEach((role) => {
        it(`allows ${role} to open create customer modal`, () => {
          cy.signIn(`${role}@example.com`, "12345abc");
          cy.visit("/en/customers");

          cy.getByData("customer-toolbar-create-new-menu-trigger")
            .filter(":visible")
            .click();
          cy.getMenuItem("customer").click();

          cy.getByData("new-customer-modal").should("be.visible");
        });
      });

      it("blocks guest from creating a customer", () => {
        cy.signIn("guest@example.com", "12345abc");
        cy.visit("/en/customers");

        cy.getByData("customer-toolbar-create-new-menu-trigger")
          .filter(":visible")
          .click();
        cy.getMenuItem("customer").click();

        cy.getByData("guest-mode-modal").should("be.visible");
      });
    });
  });
});
