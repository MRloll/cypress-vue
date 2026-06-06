import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import SignUp from "@/views/SignUp.vue";
import Home from "@/views/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/signup", name: "signup", component: SignUp },
  ],
});

describe("<SignUp />", () => {
  beforeEach(() => {
    cy.mount(SignUp, {
      global: {
        plugins: [createPinia(), router],
      },
    });
  });

  it("renders the signup form", () => {
    cy.contains("h1", "Sign Up").should("be.visible");
    cy.get('[data-testid="signup-username"]').should("exist");
    cy.get('[data-testid="signup-email"]').should("exist");
    cy.get('[data-testid="signup-password"]').should("exist");
    cy.get('[data-testid="signup-submit"]').should("contain", "Sign Up");
  });

  it("submits and calls auth store", () => {
    cy.get('[data-testid="signup-username"]').type("newuser");
    cy.get('[data-testid="signup-email"]').type("new@example.com");
    cy.get('[data-testid="signup-password"]').type("secret123");
    cy.get('[data-testid="signup-submit"]').click();
  });

  it("provides a link to login", () => {
    cy.contains("Log in").should("have.attr", "href", "/login");
  });
});
