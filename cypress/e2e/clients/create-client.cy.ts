import {
  users,
  accounts,
  positions,
  companies,
  workspaces,
} from "@/prisma/seed/test-data";

describe("Client creation", () => {
  const clientData = {
    fullName: "Created Client Name",
    bio: "Created Client Bio",
    email: "created-client@test.com",
    phoneNumber: "+654321",
    publicLink: "https://example.com/created-client",
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
    cy.visit("/en/clients");
  });

  it("creates a new client with valid data", () => {
    cy.getByData("clients-empty-section-create-button")
      .filter(":visible")
      .click();

    cy.fillClientForm(clientData);
    cy.get('button[type="submit"]').click();

    cy.getByData("entity-grid").within(() => {
      cy.contains(clientData.fullName);
      cy.contains(clientData.email);
      cy.contains(clientData.phoneNumber);
      cy.contains(clientData.publicLink);
      cy.contains("Company 1");
    });
  });

  it("shows validation errors and prevents submission with invalid data", () => {
    cy.getByData("clients-empty-section-create-button").click();

    cy.get('button[type="submit"]').click();

    cy.contains(/full name is required/i);
    cy.contains(/email is required/i);

    cy.getByData("client-email-field").type("invalid email");
    cy.getByData("client-public-link-field").clear().type("invalid url");
    cy.get('button[type="submit"]').click();

    cy.contains(/enter a valid email address/i);
    cy.contains(/please enter a valid url/i);
  });

  it("creates a client when optional fields are empty", () => {
    cy.getByData("clients-empty-section-create-button").click();

    cy.fillClientForm({
      fullName: clientData.fullName,
      email: clientData.email,
    });

    cy.get('button[type="submit"]').click();

    cy.getByData("entity-grid").within(() => {
      cy.contains(clientData.fullName);
      cy.contains(clientData.email);
      cy.contains("No phone number");
      cy.contains("No public link");
      cy.contains("No company");
    });
  });
});
