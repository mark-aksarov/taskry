Cypress.Commands.add(
  "fillUserForm",
  (data: {
    fullName?: string;
    bio?: string;
    birthdate?: { day: string; month: string; year: string };
    phoneNumber?: string;
    publicLink?: string;
    address?: string;
    positionKey?: string;
  }) => {
    // Text fields (field name : value)
    const fields = {
      "user-full-name-field": data.fullName,
      "user-bio-field": data.bio,
      "user-phone-number-field": data.phoneNumber,
      "user-public-link-field": data.publicLink,
      "user-address-field": data.address,
    };

    // We clear each field and print only if there is text.
    Object.entries(fields).forEach(([selector, value]) => {
      cy.getByData(selector).clear();
      if (value) {
        cy.getByData(selector).type(value);
      }
    });

    // Date picker
    if (data.birthdate) {
      cy.setDatePickerDate(
        "user-birthdate-date-picker",
        data.birthdate.month,
        data.birthdate.day,
        data.birthdate.year,
      );
    }

    // Select position
    if (data.positionKey !== undefined) {
      cy.getByData("user-position-select").click();
      cy.getSelectOption(data.positionKey).click();
    }
  },
);

Cypress.Commands.add(
  "fillTaskForm",
  (data: {
    title?: string;
    description?: string;
    deadline?: { day: string; month: string; year: string };
    statusKey?: string;
    categoryKey?: string;
    projectKey?: string;
    assigneeKey?: string;
  }) => {
    // Text fields (selector : value)
    const fields = {
      "task-title-field": data.title,
      "task-description-field": data.description,
    };

    // Clear & type text fields
    Object.entries(fields).forEach(([selector, value]) => {
      cy.getByData(selector).clear();
      if (value) {
        cy.getByData(selector).type(value);
      }
    });

    // Date picker
    if (data.deadline) {
      cy.setDatePickerDate(
        "task-deadline-date-picker",
        data.deadline.month,
        data.deadline.day,
        data.deadline.year,
      );
    }

    // Selects (data-testid : optionKey)
    const selects = {
      "task-status-select": data.statusKey,
      "task-category-select": data.categoryKey,
      "task-project-select": data.projectKey,
      "task-assignee-select": data.assigneeKey,
    };

    Object.entries(selects).forEach(([selectTestId, optionKey]) => {
      if (optionKey !== undefined) {
        cy.getByData(selectTestId).click();
        cy.getSelectOption(optionKey).click();
      }
    });
  },
);

Cypress.Commands.add(
  "fillProjectForm",
  (data: {
    title?: string;
    description?: string;
    deadline?: { day: string; month: string; year: string };
    statusKey?: string;
    categoryKey?: string;
    customerKey?: string;
  }) => {
    // Text fields (selector : value)
    const fields = {
      "project-title-field": data.title,
      "project-description-field": data.description,
    };

    // Clear & type text fields
    Object.entries(fields).forEach(([selector, value]) => {
      cy.getByData(selector).clear();
      if (value) {
        cy.getByData(selector).type(value);
      }
    });

    // Date picker
    if (data.deadline) {
      cy.setDatePickerDate(
        "project-deadline-date-picker",
        data.deadline.month,
        data.deadline.day,
        data.deadline.year,
      );
    }

    // Selects (data-testid : optionKey)
    const selects = {
      "project-status-select": data.statusKey,
      "project-category-select": data.categoryKey,
      "project-customer-select": data.customerKey,
    };

    Object.entries(selects).forEach(([selectTestId, optionKey]) => {
      if (optionKey !== undefined) {
        cy.getByData(selectTestId).click();
        cy.getSelectOption(optionKey).click();
      }
    });
  },
);

Cypress.Commands.add(
  "fillCustomerForm",
  (data: {
    fullName?: string;
    bio?: string;
    email?: string;
    phoneNumber?: string;
    publicLink?: string;
    companyKey?: string;
  }) => {
    // Text fields (field name : value)
    const fields = {
      "customer-full-name-field": data.fullName,
      "customer-bio-field": data.bio,
      "customer-email-field": data.email,
      "customer-phone-number-field": data.phoneNumber,
      "customer-public-link-field": data.publicLink,
    };

    // We clear each field and print only if there is text.
    Object.entries(fields).forEach(([selector, value]) => {
      cy.getByData(selector).clear();
      if (value) {
        cy.getByData(selector).type(value);
      }
    });

    // Select company
    if (data.companyKey !== undefined) {
      cy.getByData("customer-company-select").click();
      cy.getSelectOption(data.companyKey).click();
    }
  },
);

Cypress.Commands.add("changePassword", (newPassword: string) => {
  cy.getByData("change-password-button").filter(":visible").click();
  cy.get('input[name="password"]').clear().type(newPassword);
  cy.get('button[type="submit"]').click();
});

Cypress.Commands.add(
  "signInViaUI",
  (email: string, password: string, callbackUrl: string = "/") => {
    cy.visit(`/en/sign-in?callbackUrl=${callbackUrl}`);
    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/");
  },
);

Cypress.Commands.add("signOutViaUI", () => {
  cy.getByData("sign-out-btn").click();
  cy.url().should("include", "/sign-in");
});
