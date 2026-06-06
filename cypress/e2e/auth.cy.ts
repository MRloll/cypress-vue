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

  it("logs in and shows logged-in state", () => {
    cy.contains("Login").click();
    cy.get('[data-testid="login-username"]').type("testuser");
    cy.get('[data-testid="login-password"]').type("password123");
    cy.get('[data-testid="login-submit"]').click();

    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.contains("Welcome, testuser").should("be.visible");
    cy.contains("Logout").should("be.visible");
    cy.contains("Login").should("not.exist");
    cy.contains("Sign Up").should("not.exist");
  });

  it("signs up and shows logged-in state", () => {
    cy.contains("Sign Up").click();
    cy.get('[data-testid="signup-username"]').type("newuser");
    cy.get('[data-testid="signup-email"]').type("new@example.com");
    cy.get('[data-testid="signup-password"]').type("secret123");
    cy.get('[data-testid="signup-submit"]').click();

    cy.url().should("eq", Cypress.config().baseUrl + "/");
    cy.contains("Welcome, newuser").should("be.visible");
  });
});
