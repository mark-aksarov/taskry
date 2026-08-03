import {
  users,
  clients,
  members,
  projects,
  accounts,
  positions,
  companies,
  organizations,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

describe("Tasks import", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);

    const payload = {
      users,
      members,
      clients,
      projects,
      accounts,
      positions,
      companies,
      organizations,
      taskCategories,
      projectCategories,
    };

    cy.task("db:reset");
    cy.task("db:seed", payload);

    cy.signIn("user-1@test.com", "12345abc");
    cy.visit("/en/tasks");

    cy.getByData("task-manage-menu-trigger-large").click();
    cy.getMenuItem("import-csv").click();
  });

  const uploadCsv = (file: string) => {
    cy.get('input[type="file"]').selectFile(
      `cypress/fixtures/csv/task/${file}.csv`,
      { force: true },
    );

    cy.get('[data-test="import-modal-upload-button"]').click();
  };

  it("imports valid CSV file with tasks", () => {
    uploadCsv("valid");

    cy.contains("Tasks imported successfully").should("be.visible");

    cy.contains("Task 1").should("be.visible");
    cy.contains("Task 2").should("be.visible");
    cy.contains("Task 3").should("be.visible");
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

  it("shows validation error when task title is empty", () => {
    uploadCsv("empty-title");

    cy.getByData("error-banner").should("be.visible");
  });

  it("shows validation error when deadline is empty", () => {
    uploadCsv("empty-deadline");

    cy.getByData("error-banner").should("be.visible");
  });

  it("shows validation error when status is empty", () => {
    uploadCsv("empty-status");

    cy.getByData("error-banner").should("be.visible");
  });

  it("shows validation error when status is invalid", () => {
    uploadCsv("invalid-status");

    cy.getByData("error-banner").should("be.visible");
  });

  it("shows validation error when deadline format is invalid", () => {
    uploadCsv("invalid-date");

    cy.getByData("error-banner").should("be.visible");
  });

  it("shows error when project does not exist", () => {
    uploadCsv("unknown-project");

    cy.getByData("error-banner").should("be.visible");
  });

  it("shows error when category does not exist", () => {
    uploadCsv("unknown-category");

    cy.getByData("error-banner").should("be.visible");
  });

  it("shows error when assignee does not exist", () => {
    uploadCsv("unknown-assignee");

    cy.getByData("error-banner").should("be.visible");
  });

  it("ignores empty rows in CSV file", () => {
    uploadCsv("empty-rows");

    cy.contains("Tasks imported successfully").should("be.visible");

    cy.contains("Task 1").should("be.visible");
  });

  it("ignores rows with only empty values", () => {
    uploadCsv("empty-values-row");

    cy.contains("Tasks imported successfully").should("be.visible");

    cy.contains("Task 1").should("be.visible");
  });

  it("ignores rows with only whitespace values", () => {
    uploadCsv("whitespace-values-row");

    cy.contains("Tasks imported successfully").should("be.visible");

    cy.contains("Task 1").should("be.visible");
  });

  it("removes empty columns from CSV file", () => {
    uploadCsv("empty-columns");

    cy.contains("Tasks imported successfully").should("be.visible");

    cy.contains("Task 1").should("be.visible");
  });

  it("imports tasks when CSV contains additional unknown columns", () => {
    uploadCsv("unknown-columns");

    cy.contains("Tasks imported successfully").should("be.visible");

    cy.contains("Task 1").should("be.visible");
  });

  it("imports tasks with quoted values", () => {
    uploadCsv("quoted-values");

    cy.contains("Tasks imported successfully").should("be.visible");

    cy.contains("Task 1").should("be.visible");
  });

  it("imports tasks with commas inside values", () => {
    uploadCsv("commas-in-values");

    cy.contains("Tasks imported successfully").should("be.visible");

    cy.contains("Task 1").should("be.visible");
  });
});
