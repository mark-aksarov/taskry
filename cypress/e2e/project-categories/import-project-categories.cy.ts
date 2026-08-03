import {
  users,
  accounts,
  positions,
  organizations,
  members,
} from "@/prisma/seed/test-data";

describe("Project category import", () => {
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
    cy.visit("/en/project-categories");

    cy.getByData("project-category-manage-menu-trigger-large").click();
    cy.getMenuItem("import-csv").click();
  });

  it("imports valid CSV file with categories", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/project-category/valid.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.contains("Project categories imported successfully").should(
      "be.visible",
    );

    cy.contains("Project Category 1").should("be.visible");
    cy.contains("Project Category 2").should("be.visible");
    cy.contains("Project Category 3").should("be.visible");
    cy.contains("Project Category 4").should("be.visible");
    cy.contains("Project Category 5").should("be.visible");
  });

  it("shows error when CSV file is empty", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/project-category/empty.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.getByData("error-banner").should("be.visible");
  });

  it("shows error when CSV contains only headers without data", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/project-category/headers-only.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.getByData("error-banner").should("be.visible");
  });

  it("shows validation error when required column is missing", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/project-category/missing-required-column.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.getByData("error-banner").should("be.visible");
  });

  it("ignores empty rows in CSV file", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/project-category/empty-rows.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.contains("Project categories imported successfully").should(
      "be.visible",
    );

    cy.contains("Project Category 1").should("be.visible");
    cy.contains("Project Category 2").should("be.visible");
    cy.contains("Project Category 3").should("be.visible");
  });

  it("trims whitespace from category names", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/project-category/whitespace.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.contains("Project categories imported successfully").should(
      "be.visible",
    );

    cy.contains("Project Category 1").should("be.visible");
    cy.contains("Project Category 2").should("be.visible");
    cy.contains("Project Category 3").should("be.visible");
  });

  it("removes empty columns from CSV file", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/project-category/empty-columns.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.contains("Project categories imported successfully").should(
      "be.visible",
    );
  });

  it("shows validation error when CSV contains additional unknown columns", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/project-category/unknown-columns.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.getByData("error-banner").should("be.visible");
  });

  it("imports categories with quoted values", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/project-category/quoted-values.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.contains("Project categories imported successfully").should(
      "be.visible",
    );
  });

  it("imports categories with commas inside values", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/project-category/commas-in-values.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.contains("Project categories imported successfully").should(
      "be.visible",
    );
  });

  it("rejects files with unsupported extension", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/project-category/invalid-extension.txt",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.getByData("error-banner").should("be.visible");
  });

  it("rejects CSV files exceeding maximum allowed size", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/project-category/too-large.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.getByData("error-banner").should("be.visible");
  });

  it("shows validation error for category name exceeding maximum length", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/project-category/name-too-long.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.getByData("error-banner").should("be.visible");
  });
});
