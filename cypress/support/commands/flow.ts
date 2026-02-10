Cypress.Commands.add(
  "fillEditUserForm",
  (data: {
    fullName: string;
    bio: string;
    birthdate: { day: string; month: string; year: string };
    phoneNumber: string;
    publicLink: string;
    address: string;
    positionKey: string;
  }) => {
    const birthdate = data.birthdate;

    cy.get('input[name="fullName"]').clear().type(data.fullName);
    cy.get('textarea[name="bio"]').clear().type(data.bio);
    cy.setDatePickerDate(
      "birthdate-date-picker",
      birthdate.month,
      birthdate.day,
      birthdate.year,
    );
    cy.get('input[name="phoneNumber"]').clear().type(data.phoneNumber);
    cy.get('input[name="publicLink"]').clear().type(data.publicLink);
    cy.get('input[name="address"]').clear().type(data.address);
    cy.getByData("position-select").click();
    cy.getSelectOption(data.positionKey).click();
    cy.get('button[type="submit"]').click();
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
    title: string;
    description: string;
    deadline: { day: string; month: string; year: string };
    statusKey: string;
    categoryKey: string;
    customerKey: string;
  }) => {
    const deadline = data.deadline;

    // fill form
    cy.get('input[name="title"]').clear().type(data.title);
    cy.get('textarea[name="description"]').clear().type(data.description);

    cy.setDatePickerDate(
      "deadline-date-picker",
      deadline.month,
      deadline.day,
      deadline.year,
    );

    cy.getByData("status-select").click();
    cy.getSelectOption(data.statusKey).click();

    cy.getByData("category-select").click();
    cy.getSelectOption(data.categoryKey).click();

    cy.getByData("customer-select").click();
    cy.getSelectOption(data.customerKey).click();

    // submit
    cy.get('button[type="submit"]').click();
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
      'input[name="fullName"]': data.fullName,
      'textarea[name="bio"]': data.bio,
      'input[name="email"]': data.email,
      'input[name="phoneNumber"]': data.phoneNumber,
      'input[name="publicLink"]': data.publicLink,
    };

    // We clear each field and print only if there is text.
    Object.entries(fields).forEach(([selector, value]) => {
      cy.get(selector).clear();
      if (value) {
        cy.get(selector).type(value);
      }
    });

    // Select company
    if (data.companyKey !== undefined) {
      cy.getByData("company-select").click();
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
