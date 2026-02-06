declare namespace Cypress {
  interface Chainable {
    signIn(email: string, password: string): Chainable<void>;
    getByRole(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;

    getSelectOption(key: string): Chainable<JQuery<HTMLElement>>;
    getMenuItem(key: string): Chainable<JQuery<HTMLElement>>;

    setDatePickerDate(
      dataTestAttribute: string,
      day: string,
      month: string,
      year: string,
    ): Chainable<JQuery<HTMLElement>>;

    fillEditForm(data: {
      fullName: string;
      bio: string;
      birthdate: { month: string; day: string; year: string };
      phoneNumber: string;
      publicLink: string;
      address: string;
      positionId: string;
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
