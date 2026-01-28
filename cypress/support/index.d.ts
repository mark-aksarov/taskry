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

    checkNotifications(
      expectedCount: number,
      expectedNotifications?: NotificationCheck[],
    ): Chainable<JQuery<HTMLElement>>;
  }
}
