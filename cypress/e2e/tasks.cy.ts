beforeEach(() => {
  cy.viewport(1440, 900);
});

describe("Tasks Page", () => {
  describe("Task List", () => {
    describe("Modals", () => {
      beforeEach(() => {
        cy.signIn("owner@example.com", "12345abc", "/tasks");
      });

      it("goes to the full task page", () => {
        cy.getByData("task-list-item-title").eq(0).click();
        cy.getByData("open-full-page-button")
          .should("have.attr", "href")
          .then((href) => {
            cy.getByData("open-full-page-button").click();
            cy.location("pathname").should("include", href);
          });
      });

      it("goes to the full project page", () => {
        cy.getByData("task-list-item-project-title").eq(0).click();
        cy.getByData("open-full-page-button")
          .should("have.attr", "href")
          .then((href) => {
            cy.getByData("open-full-page-button").click();
            cy.location("pathname").should("include", href);
          });
      });

      it("goes to the user's profile page", () => {
        cy.getByData("task-list-item-user-title").eq(0).click();
        cy.getByData("open-full-page-button")
          .should("have.attr", "href")
          .then((href) => {
            cy.getByData("open-full-page-button").click();
            cy.location("pathname").should("include", href);
          });
      });
    });

    describe("Owner Actions", () => {
      beforeEach(() => {
        cy.signIn("owner@example.com", "12345abc", "/tasks");
      });

      it("can edit a task", () => {
        cy.getMenuItem("task-list-item-action-menu-trigger", "edit").click();
        cy.get('input[name="title"]').clear().type("test");
        cy.get('textarea[name="description"]').clear().type("test");
        cy.setDatePickerDate("deadline-date-picker", "31", "12", "2025");
        cy.changeSelection("status-select");
        cy.changeSelection("category-select");
        cy.changeSelection("project-select");
        cy.changeSelection("assignee-select");
        cy.get('button[type="submit"]').click();
        cy.getByData("edit-task-modal").should("not.exist");
      });

      it("can delete a task", () => {
        cy.getMenuItem("task-list-item-action-menu-trigger", "delete").click();
        cy.getByData("confirm-button").click();
        cy.getByData("confirm-modal").should("not.exist");
      });
    });

    describe("User Actions", () => {
      beforeEach(() => {
        cy.signIn("user@example.com", "12345abc", "/tasks");
      });

      it("cannot click the Edit button", () => {
        cy.getMenuItem("task-list-item-action-menu-trigger", "edit").should(
          "have.attr",
          "aria-disabled",
          "true",
        );
      });

      it("cannot click the Delete button", () => {
        cy.getMenuItem("task-list-item-action-menu-trigger", "delete").should(
          "have.attr",
          "aria-disabled",
          "true",
        );
      });
    });

    describe("Task Status Rules", () => {
      beforeEach(() => {
        cy.signIn("owner@example.com", "12345abc", "/tasks?pageSize=100");
      });

      describe("When project status is Pending", () => {
        it("cannot change to Active", () => {
          cy.getTaskMenuItem("active", "pending", "pending").should(
            "have.attr",
            "aria-disabled",
            "true",
          );
        });

        it("can change to Completed when ", () => {
          cy.getTaskMenuItem("completed", "pending").click();
        });
      });

      describe("When project status is Active", () => {
        it("can change to Pending", () => {
          cy.getTaskMenuItem("pending", "active").click();
        });

        it("can change to Completed", () => {
          cy.getTaskMenuItem("completed", "active").click();
        });
      });

      describe("When project status is Completed", () => {
        it("cannot change to Active", () => {
          cy.getTaskMenuItem("active", "completed").click();
        });

        it("cannot change to Pending", () => {
          cy.getTaskMenuItem("pending", "completed").click();
        });
      });
    });
  });
});
