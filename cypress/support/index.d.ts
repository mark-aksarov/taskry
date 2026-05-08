declare namespace Cypress {
  interface Chainable {
    signIn(email: string, password: string): Chainable<void>;
    getByRole(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    getByData(
      dataTestAttribute: string,
      id?: string,
    ): Chainable<JQuery<HTMLElement>>;

    getSelectOption(key: string): Chainable<JQuery<HTMLElement>>;
    getMenuItem(key: string): Chainable<JQuery<HTMLElement>>;

    setDatePickerDate(
      dataTestAttribute: string,
      month: string,
      day: string,
      year: string,
    ): Chainable<JQuery<HTMLElement>>;

    fillCreateUserForm(data: {
      fullName?: string;
      email?: string;
    }): Chainable<JQuery<HTMLElement>>;

    fillUpdateUserForm(data: {
      fullName?: string;
      bio?: string;
      birthdate?: { month: string; day: string; year: string };
      phoneNumber?: string;
      publicLink?: string;
      address?: string;
      positionKey?: string;
    }): Chainable<JQuery<HTMLElement>>;

    fillTaskForm(data: {
      title?: string;
      description?: string;
      deadline?: { day: string; month: string; year: string };
      statusKey?: string;
      categoryKey?: string;
      projectKey?: string;
      assigneeKey?: string;
    }): Chainable<JQuery<HTMLElement>>;

    fillProjectForm(data: {
      title?: string;
      description?: string;
      deadline?: { day: string; month: string; year: string };
      statusKey?: string;
      categoryKey?: string;
      customerKey?: string;
    }): Chainable<JQuery<HTMLElement>>;

    fillCustomerForm(data: {
      fullName?: string;
      bio?: string;
      email?: string;
      phoneNumber?: string;
      publicLink?: string;
      companyKey?: string;
    }): Chainable<JQuery<HTMLElement>>;

    changePassword(newPassword: string): Chainable<JQuery<HTMLElement>>;
    signInViaUI(
      email: string,
      password: string,
      callbackUrl: string,
    ): Chainable<JQuery<HTMLElement>>;
    signOutViaUI(): Chainable<JQuery<HTMLElement>>;
  }
}
