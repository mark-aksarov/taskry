import {
  users,
  accounts,
  positions,
  organizations,
  members,
} from "@/prisma/seed/test-data";

describe("Positions import", () => {
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
    cy.visit("/en/positions");

    cy.getByData("position-manage-menu-trigger-large").click();
    cy.getMenuItem("import-csv").click();
  });

  const uploadCsv = (file: string) => {
    cy.get('input[type="file"]').selectFile(
      `cypress/fixtures/csv/position/${file}.csv`,
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();
  };

  it("imports valid CSV file with positions", () => {
    uploadCsv("valid");

    cy.contains("Position 1").should("be.visible");
    cy.contains("Position 2").should("be.visible");
    cy.contains("Position 3").should("be.visible");
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

    cy.contains("Position 1").should("be.visible");
    cy.contains("Position 2").should("be.visible");
    cy.contains("Position 3").should("be.visible");
  });

  it("trims whitespace from position names", () => {
    uploadCsv("trim-whitespace");

    cy.contains("Position 1").should("be.visible");
    cy.contains("Position 2").should("be.visible");
    cy.contains("Position 3").should("be.visible");
  });

  it("removes empty columns from CSV file", () => {
    uploadCsv("empty-columns");

    cy.contains("Position 1").should("be.visible");
    cy.contains("Position 2").should("be.visible");
    cy.contains("Position 3").should("be.visible");
  });

  it("imports positions when CSV contains additional unknown columns", () => {
    uploadCsv("unknown-columns");

    cy.contains("Position 1").should("be.visible");
  });

  it("imports positions with quoted values", () => {
    uploadCsv("quoted-values");

    cy.contains("Position 1").should("be.visible");
    cy.contains("Position 2").should("be.visible");
  });

  it("imports positions with commas inside values", () => {
    uploadCsv("commas-in-values");

    cy.contains("Position 1, Frontend").should("be.visible");
  });

  it("rejects files with unsupported extension", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/position/invalid.txt",
      { force: true },
    );

    cy.getByData("error-banner").should("be.visible");
  });

  it("rejects CSV files exceeding maximum allowed size", () => {
    uploadCsv("large-file");

    cy.getByData("error-banner").should("be.visible");
  });

  it("shows validation error for position name exceeding maximum length", () => {
    uploadCsv("max-length");

    cy.getByData("error-banner").should("be.visible");
  });
});
