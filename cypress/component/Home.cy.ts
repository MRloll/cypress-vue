import Home from '@/views/Home.vue'

describe('<Home />', () => {
  it('renders welcome message', () => {
    cy.mount(Home)
    cy.contains('h1', 'Cypress Vue E2E Demo').should('be.visible')
    cy.contains('Welcome to the app').should('be.visible')
  })
})
