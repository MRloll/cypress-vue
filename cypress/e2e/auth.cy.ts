describe("Auth Flow", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("navigates to login page", () => {
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.get('[data-testid="login-username"]').should("exist");
  });

  it("navigates to signup page", () => {
    cy.contains("Sign Up").click();
    cy.url().should("include", "/signup");
    cy.get('[data-testid="signup-username"]').should("exist");
  });
});
