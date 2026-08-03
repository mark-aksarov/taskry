import {
  users,
  accounts,
  positions,
  organizations,
  members,
} from "@/prisma/seed/test-data";

describe("Companies import", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      organizations,
      members,
      positions,
      users,
      accounts,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);

    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/companies");

    cy.getByData("company-manage-menu-trigger-large").click();
    cy.getMenuItem("import-csv").click();
  });

  const uploadCsv = (file: string) => {
    cy.get('input[type="file"]').selectFile(
      `cypress/fixtures/csv/company/${file}.csv`,
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();
  };

  it("imports valid CSV file with companies", () => {
    uploadCsv("valid");

    cy.contains("Company 1").should("be.visible");
    cy.contains("Company 2").should("be.visible");
    cy.contains("Company 3").should("be.visible");
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
    uploadCsv("missing-column");

    cy.getByData("error-banner").should("be.visible");
  });

  it("ignores empty rows in CSV file", () => {
    uploadCsv("empty-rows");

    cy.contains("Company 1").should("be.visible");
    cy.contains("Company 2").should("be.visible");
    cy.contains("Company 3").should("be.visible");
  });

  it("trims whitespace from company names", () => {
    uploadCsv("trim-whitespace");

    cy.contains("Company 1").should("be.visible");
    cy.contains("Company 2").should("be.visible");
    cy.contains("Company 3").should("be.visible");
  });

  it("removes empty columns from CSV file", () => {
    uploadCsv("empty-columns");

    cy.contains("Company 1").should("be.visible");
    cy.contains("Company 2").should("be.visible");
    cy.contains("Company 3").should("be.visible");
  });

  it("imports companies when CSV contains additional unknown columns", () => {
    uploadCsv("unknown-columns");

    cy.contains("Company 1").should("be.visible");
  });

  it("imports companies with quoted values", () => {
    uploadCsv("quoted-values");

    cy.contains("Company 1").should("be.visible");
    cy.contains("Company 2").should("be.visible");
  });

  it("imports companies with commas inside values", () => {
    uploadCsv("commas-in-values");

    cy.contains("Company, 1").should("be.visible");
  });

  it("rejects files with unsupported extension", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/company/invalid.txt",
      { force: true },
    );

    cy.getByData("error-banner").should("be.visible");
  });

  it("rejects CSV files exceeding maximum allowed size", () => {
    uploadCsv("large-file");

    cy.getByData("error-banner").should("be.visible");
  });

  it("shows validation error for company name exceeding maximum length", () => {
    uploadCsv("max-length");

    cy.getByData("error-banner").should("be.visible");
  });
});
