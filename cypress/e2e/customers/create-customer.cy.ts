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
  });

  describe("customers page", () => {
    beforeEach(() => {
      cy.signIn("user-1@test.com", "12345abc");
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
    const allowedUsers = [
      { role: "owner", id: "user-1" },
      { role: "user", id: "user-2" },
    ] as const;

    describe("customers page", () => {
      allowedUsers.forEach((user) => {
        it(`allows ${user.role} to open create customer modal`, () => {
          cy.signIn(`${user.id}@test.com`, "12345abc");
          cy.visit("/en/customers");

          cy.getByData("customer-toolbar-create-new-menu-trigger")
            .filter(":visible")
            .click();
          cy.getMenuItem("customer").click();

          cy.getByData("new-customer-modal").should("be.visible");
        });
      });

      it("blocks guest from creating a customer", () => {
        cy.signIn("user-3@test.com", "12345abc");
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
