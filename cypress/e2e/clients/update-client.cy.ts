import {
  users,
  accounts,
  positions,
  companies,
  clients,
  organizations,
  members,
} from "@/prisma/seed/test-data";

describe("Client updating", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      organizations,
      members,
      positions,
      users,
      accounts,
      companies,
      clients,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);
    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/clients");
  });

  it("updates a client successfully", () => {
    cy.getByData("client-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.fillClientForm({
      fullName: "Updated Client Name",
      email: "updated-client@test.com",
      bio: "Updated Client Bio",
      publicLink: "https://example.com/updated-client",
      phoneNumber: "+654321",
      companyKey: "",
    });

    cy.get('button[type="submit"]').click();

    cy.getByData("entity-grid").within(() => {
      cy.contains("Updated Client Name");
      cy.contains("updated-client@test.com");
      cy.contains("+654321");
      cy.contains("https://example.com/updated-client");
      cy.contains("No company");
    });
  });

  it("pre-fills client form with default values", () => {
    cy.getByData("client-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.getByData("client-full-name-field").within(() =>
      cy.get("input").should("have.value", "Client 1"),
    );
    cy.getByData("client-bio-field").within(() =>
      cy.get("textarea").should("have.value", "Client 1 bio"),
    );
    cy.getByData("client-email-field").within(() =>
      cy.get("input").should("have.value", "client-1@test.com"),
    );
    cy.getByData("client-phone-number-field").within(() =>
      cy.get("input").should("have.value", "123-456-7890"),
    );
    cy.getByData("client-public-link-field").within(() =>
      cy.get("input").should("have.value", "https://example.com/client-1"),
    );
    cy.getByData("company-select").within(() =>
      cy.get("select").should("have.value", "1"),
    );
  });

  it("updates a client when optional fields are empty", () => {
    cy.getByData("client-item-action-menu-trigger", "1").click();
    cy.getMenuItem("edit").click();

    cy.fillClientForm({
      fullName: "Updated Client Name",
      email: "updated-client@test.com",
      companyKey: "",
    });

    cy.get('button[type="submit"]').click();

    cy.getByData("entity-grid").within(() => {
      cy.contains("Updated Client Name");
      cy.contains("updated-client@test.com");
      cy.contains("No phone number");
      cy.contains("No public link");
      cy.contains("No company");
    });
  });
});
