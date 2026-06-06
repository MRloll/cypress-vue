import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/login", name: "login", component: Login },
  ],
});

describe("<Login />", () => {
  beforeEach(() => {
    cy.mount(Login, {
      global: {
        plugins: [createPinia(), router],
      },
    });
  });

  it("renders the login form", () => {
    cy.contains("h1", "Login").should("be.visible");
    cy.get('[data-testid="login-username"]').should("exist");
    cy.get('[data-testid="login-password"]').should("exist");
    cy.get('[data-testid="login-submit"]').should("contain", "Log In");
  });

  it("submits and calls auth store", () => {
    cy.get('[data-testid="login-username"]').type("testuser");
    cy.get('[data-testid="login-password"]').type("password123");
    cy.get('[data-testid="login-submit"]').click();
  });

  it("provides a link to signup", () => {
    cy.contains("Sign up").should("have.attr", "href", "/signup");
  });
});
