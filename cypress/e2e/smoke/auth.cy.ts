describe("Auth Smoke Tests", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
  });

  it("should redirect unauthenticated user to sign-in page", () => {
    cy.visit("/en/projects");
    cy.url().should("include", "/sign-in");
  });

  it("should sign-out successfully", () => {
    cy.signIn("owner@example.com", "12345abc");
    cy.visit("/en");
    cy.getByData("sign-out-btn").click();
    cy.url().should("include", "/sign-in");
  });
});
