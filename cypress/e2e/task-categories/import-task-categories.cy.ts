import {
  users,
  accounts,
  positions,
  organizations,
  members,
} from "@/prisma/seed/test-data";

describe("Task category import", () => {
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
    cy.visit("/en/task-categories");

    cy.getByData("task-category-manage-menu-trigger-large").click();
    cy.getMenuItem("import-csv").click();
  });

  it("imports valid CSV file with categories", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/task-category/valid.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.contains("Task categories imported successfully").should("be.visible");

    cy.contains("Task Category 1").should("be.visible");
    cy.contains("Task Category 2").should("be.visible");
    cy.contains("Task Category 3").should("be.visible");
    cy.contains("Task Category 4").should("be.visible");
    cy.contains("Task Category 5").should("be.visible");
  });

  it("shows error when CSV file is empty", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/task-category/empty.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.getByData("error-banner").should("be.visible");
  });

  it("shows error when CSV contains only headers without data", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/task-category/headers-only.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.getByData("error-banner").should("be.visible");
  });

  it("shows validation error when required column is missing", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/task-category/missing-required-column.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.getByData("error-banner").should("be.visible");
  });

  it("ignores empty rows in CSV file", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/task-category/empty-rows.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.contains("Task categories imported successfully").should("be.visible");

    cy.contains("Task Category 1").should("be.visible");
    cy.contains("Task Category 2").should("be.visible");
    cy.contains("Task Category 3").should("be.visible");
  });

  it("trims whitespace from category names", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/task-category/whitespace.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.contains("Task categories imported successfully").should("be.visible");

    cy.contains("Task Category 1").should("be.visible");
    cy.contains("Task Category 2").should("be.visible");
    cy.contains("Task Category 3").should("be.visible");
  });

  it("removes empty columns from CSV file", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/task-category/empty-columns.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.contains("Task categories imported successfully").should("be.visible");

    cy.contains("Task Category 1").should("be.visible");
    cy.contains("Task Category 2").should("be.visible");
    cy.contains("Task Category 3").should("be.visible");
  });

  it("shows validation error when CSV contains additional unknown columns", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/task-category/unknown-columns.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.getByData("error-banner").should("be.visible");
  });

  it("imports categories with quoted values", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/task-category/quoted-values.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.contains("Task categories imported successfully").should("be.visible");

    cy.contains("Task Category 1").should("be.visible");
    cy.contains("Task Category 2").should("be.visible");
    cy.contains("Task Category 3").should("be.visible");
  });

  it("imports categories with commas inside values", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/task-category/commas-in-values.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.contains("Task categories imported successfully").should("be.visible");

    cy.contains("Task Category, 1").should("be.visible");
    cy.contains("Task Category, 2").should("be.visible");
    cy.contains("Task Category, 3").should("be.visible");
  });

  it("rejects files with unsupported extension", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/task-category/invalid-extension.txt",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.getByData("error-banner").should("be.visible");
  });

  it("rejects CSV files exceeding maximum allowed size", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/task-category/too-large.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.getByData("error-banner").should("be.visible");
  });

  it("shows validation error for category name exceeding maximum length", () => {
    cy.get('input[type="file"]').selectFile(
      "cypress/fixtures/csv/task-category/name-too-long.csv",
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();

    cy.getByData("error-banner").should("be.visible");
  });
});
