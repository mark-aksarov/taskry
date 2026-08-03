import {
  users,
  accounts,
  positions,
  organizations,
  companies,
  members,
} from "@/prisma/seed/test-data";

describe("Clients import", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      organizations,
      members,
      positions,
      users,
      companies,
      accounts,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);

    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/clients");

    cy.getByData("client-manage-menu-trigger-large").click();
    cy.getMenuItem("import-csv").click();
  });

  const uploadCsv = (file: string) => {
    cy.get('input[type="file"]').selectFile(
      `cypress/fixtures/csv/client/${file}.csv`,
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();
  };

  it("imports valid CSV file with clients", () => {
    uploadCsv("valid");

    cy.contains("Clients imported successfully").should("be.visible");

    cy.contains("Client 1").should("be.visible");
    cy.contains("Client 2").should("be.visible");
    cy.contains("Client 3").should("be.visible");
  });

  it("shows error when CSV file is empty", () => {
    uploadCsv("empty");

    cy.getByData("error-banner").should("be.visible");
  });

  it("shows error when CSV contains only headers without data", () => {
    uploadCsv("headers-only");

    cy.getByData("error-banner").should("be.visible");
  });

  it("shows validation error when required column is missing", () => {
    uploadCsv("missing-required-column");

    cy.getByData("error-banner").should("be.visible");
  });

  it("shows validation error when client name is empty", () => {
    uploadCsv("empty-full-name");

    cy.getByData("error-banner").should("be.visible");
  });

  it("shows validation error when client email is empty", () => {
    uploadCsv("empty-email");

    cy.getByData("error-banner").should("be.visible");
  });

  it("shows validation error when client email is invalid", () => {
    uploadCsv("invalid-email");

    cy.getByData("error-banner").should("be.visible");
  });

  it("shows error when company does not exist", () => {
    uploadCsv("unknown-company");

    cy.getByData("error-banner").should("be.visible");
  });

  it("shows error when company belongs to another organization", () => {
    uploadCsv("company-from-another-organization");

    cy.getByData("error-banner").should("be.visible");
  });

  it("ignores empty rows in CSV file", () => {
    uploadCsv("empty-rows");

    cy.contains("Clients imported successfully").should("be.visible");

    cy.contains("Client 1").should("be.visible");
    cy.contains("Client 2").should("be.visible");
  });

  it("ignores rows with only empty values", () => {
    uploadCsv("empty-values-row");

    cy.contains("Clients imported successfully").should("be.visible");

    cy.contains("Client 1").should("be.visible");
    cy.contains("Client 2").should("be.visible");
  });

  it("ignores rows with only whitespace values", () => {
    uploadCsv("whitespace-values-row");

    cy.contains("Clients imported successfully").should("be.visible");

    cy.contains("Client 1").should("be.visible");
    cy.contains("Client 2").should("be.visible");
  });

  it("removes empty columns from CSV file", () => {
    uploadCsv("empty-columns");

    cy.contains("Clients imported successfully").should("be.visible");

    cy.contains("Client 1").should("be.visible");
    cy.contains("Client 2").should("be.visible");
  });

  it("shows error when CSV contains additional unknown columns", () => {
    uploadCsv("unknown-columns");

    cy.getByData("error-banner").should("be.visible");
  });

  it("imports clients with quoted values", () => {
    uploadCsv("quoted-values");

    cy.contains("Clients imported successfully").should("be.visible");

    cy.contains("Client 1").should("be.visible");
  });

  it("imports clients with commas inside values", () => {
    uploadCsv("commas-in-values");

    cy.contains("Clients imported successfully").should("be.visible");

    cy.contains("Client 1").should("be.visible");
    cy.contains("Client 2").should("be.visible");
  });

  it("allows duplicate email addresses", () => {
    uploadCsv("duplicate-emails");

    cy.contains("Clients imported successfully").should("be.visible");

    cy.contains("Client 1").should("be.visible");
    cy.contains("Client 2").should("be.visible");
  });
});
