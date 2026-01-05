import { E2ESeedPayload } from "@/prisma/e2e/types";

describe("Project List Item", () => {
  describe("Navigation & Modals", () => {
    beforeEach(() => {
      cy.viewport(1440, 900);

      const payload: E2ESeedPayload = {
        companies: [
          {
            id: 1,
            name: "Company 1",
            workspaceId: 1,
          },
        ],
        customers: [
          {
            id: 1,
            email: "owner@example.com",
            fullName: "John Doe",
            companyId: 1,
            workspaceId: 1,
          },
        ],
        projectCategories: [
          {
            id: 1,
            name: "Category 1",
            workspaceId: 1,
          },
        ],
        projects: [
          {
            id: 1,
            title: "Project 1",
            status: "active",
            deadline: new Date("2022-01-01"),
            categoryId: 1,
            customerId: 1,
            workspaceId: 1,
            creatorId: "user-1",
          },
        ],
      };

      cy.task("db:reset");
      cy.task("db:seed", payload);
      cy.signIn("owner@example.com", "12345abc");
      cy.visit("/en/projects");
    });

    it("goes to the full project page", () => {
      cy.getByData("project-list-item-title-trigger").eq(0).click();
      cy.getByData("open-full-page-button")
        .should("have.attr", "href")
        .then((href) => {
          cy.getByData("open-full-page-button").click();
          cy.location("pathname").should("include", href);
        });
    });

    it("goes to the creator profile page", () => {
      cy.getByData("project-list-item-creator-image-trigger").eq(0).click();
      cy.getByData("open-full-page-button")
        .should("have.attr", "href")
        .then((href) => {
          cy.getByData("open-full-page-button").click();
          cy.location("pathname").should("include", href);
        });
    });
  });
});
