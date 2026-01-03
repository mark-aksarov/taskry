declare namespace Cypress {
  interface Chainable {
    signIn(
      email: string,
      password: string,
      callbackUrl: string,
    ): Chainable<void>;
    getByRole(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    changeSelection(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    getMenuItem(
      dataTestAttribute: string,
      key: string,
    ): Chainable<JQuery<HTMLElement>>;
    setDatePickerDate(
      dataTestAttribute: string,
      day: string,
      month: string,
      year: string,
    ): Chainable<JQuery<HTMLElement>>;
  }
}
