import { createPinia, setActivePinia } from "pinia";
import Home from "@/views/Home.vue";
import { useAuthStore } from "@/stores/auth";
import { usePostsStore } from "@/stores/posts";

const mockPosts = [
  {
    userId: 1,
    id: 1,
    title: "First post",
    body: "This is the body of the first post.",
  },
  {
    userId: 1,
    id: 2,
    title: "Second post",
    body: "This is the body of the second post.",
  },
];

describe("<Home />", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("renders welcome message when logged out", () => {
    cy.mount(Home);
    cy.contains("h1", "Cypress Vue E2E Demo").should("be.visible");
    cy.contains("Welcome to the app").should("be.visible");
  });

  it("shows loading state while fetching posts", () => {
    cy.intercept(
      "GET",
      "https://jsonplaceholder.typicode.com/posts*",
      (req) => {
        req.reply(mockPosts);
      },
    ).as("getPosts");

    const auth = useAuthStore();
    auth.login("testuser", "password123");

    cy.mount(Home);
    cy.get('[data-testid="loading"]').should("be.visible");
    cy.wait("@getPosts");
  });

  it("displays posts when logged in after fetch completes", () => {
    cy.intercept("GET", "https://jsonplaceholder.typicode.com/posts*", {
      body: mockPosts,
    }).as("getPosts");

    const auth = useAuthStore();
    auth.login("testuser", "password123");

    cy.mount(Home);
    cy.wait("@getPosts");
    cy.get('[data-testid="greeting"]').should("contain", "Welcome, testuser!");
    cy.get('[data-testid="posts-list"]').should("be.visible");
    cy.get('[data-testid="post-item"]').should("have.length", 2);
    cy.get('[data-testid="post-item"]').first().should("contain", "First post");
  });

  it("shows error message when fetch fails", () => {
    cy.intercept("GET", "https://jsonplaceholder.typicode.com/posts*", {
      statusCode: 500,
      body: "Server error",
    }).as("getPosts");

    const auth = useAuthStore();
    auth.login("testuser", "password123");

    cy.mount(Home);
    cy.wait("@getPosts");
    cy.get('[data-testid="error"]').should("be.visible");
  });
});
