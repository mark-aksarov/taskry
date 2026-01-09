describe("auth smoke tests", () => {
  beforeEach(() => {
    cy.viewport(1440, 900);
  });

  it("should redirect unauthenticated user to sign-in page", () => {
    cy.visit("/en/projects");
    cy.url().should("include", "/sign-in");
  });

  it("should sign-out successfully", () => {
    cy.visit("/en/sign-in");
    cy.get("input[name=email]").type("owner@example.com");
    cy.get("input[name=password]").type("12345abc");
    cy.get('button[type="submit"]').click();
    cy.getByData("sign-out-btn").click();
    cy.url().should("include", "/sign-in");
  });
});
