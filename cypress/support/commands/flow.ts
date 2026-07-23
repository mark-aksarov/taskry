Cypress.Commands.add(
  "fillCreateUserForm",
  (data: { fullName?: string; email?: string; password?: string }) => {
    // Text fields (field name : value)
    const fields = {
      "user-full-name-field": data.fullName,
      "user-email-field": data.email,
    };

    // We clear each field and print only if there is text.
    Object.entries(fields).forEach(([selector, value]) => {
      cy.getByData(selector).clear();
      if (value) {
        cy.getByData(selector).type(value);
      }
    });
  },
);

Cypress.Commands.add(
  "fillUpdateUserForm",
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
      cy.getByData("position-select").click();
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
      "project-select": data.projectKey,
      "user-select": data.assigneeKey,
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
    clientKey?: string;
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
      "client-select": data.clientKey,
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
  "fillClientForm",
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
      "client-full-name-field": data.fullName,
      "client-bio-field": data.bio,
      "client-email-field": data.email,
      "client-phone-number-field": data.phoneNumber,
      "client-public-link-field": data.publicLink,
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
      cy.getByData("company-select").click();
      cy.getSelectOption(data.companyKey).click();
    }
  },
);

Cypress.Commands.add(
  "changePassword",
  (currentPassword: string, newPassword: string) => {
    cy.getByData("change-password-button").filter(":visible").click();
    cy.get('input[name="currentPassword"]').clear().type(currentPassword);
    cy.get('input[name="newPassword"]').clear().type(newPassword);
    cy.get('button[type="submit"]').click();
  },
);

Cypress.Commands.add(
  "signInViaUI",
  (email: string, password: string, callbackUrl: string = "/dashboard") => {
    cy.visit(`/en/sign-in?callbackUrl=${callbackUrl}`);
    cy.get("input[name=email]").type(email);
    cy.get("input[name=password]").type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/dashboard");
  },
);

Cypress.Commands.add("signOutViaUI", () => {
  cy.getByData("sign-out-btn").click();
  cy.url().should("include", "/sign-in");
});
