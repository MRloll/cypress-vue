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

  it("logs in and fetches posts from JSONPlaceholder", () => {
    cy.intercept("GET", "https://jsonplaceholder.typicode.com/posts*", {
      body: [
        { userId: 1, id: 1, title: "Test Post 1", body: "Body of test post 1" },
        { userId: 1, id: 2, title: "Test Post 2", body: "Body of test post 2" },
      ],
    }).as("getPosts");

    cy.contains("Login").click();
    cy.get('[data-testid="login-username"]').type("testuser");
    cy.get('[data-testid="login-password"]').type("password123");
    cy.get('[data-testid="login-submit"]').click();

    cy.wait("@getPosts");
    cy.get('[data-testid="posts-list"]').should("be.visible");
    cy.get('[data-testid="post-item"]').should("have.length", 2);
    cy.contains("Test Post 1").should("be.visible");
    cy.contains("Test Post 2").should("be.visible");
  });

  it("logs out and resets state", () => {
    cy.contains("Login").click();
    cy.get('[data-testid="login-username"]').type("testuser");
    cy.get('[data-testid="login-password"]').type("password123");
    cy.get('[data-testid="login-submit"]').click();

    cy.contains("Logout").click();
    cy.url().should("include", "/login");
    cy.contains("Login").should("be.visible");
    cy.contains("Sign Up").should("be.visible");
  });

  it("redirects between login and signup pages", () => {
    cy.contains("Login").click();
    cy.contains("Sign up").click();
    cy.url().should("include", "/signup");

    cy.contains("Log in").click();
    cy.url().should("include", "/login");
  });
});
