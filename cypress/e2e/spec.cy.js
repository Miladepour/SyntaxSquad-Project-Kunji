describe('Auth0 & db reseed', () => {
  beforeEach(() => {
    cy.loginToAuth0(
      Cypress.env('auth0_username'),
      Cypress.env('auth0_password')
    )
    cy.visit('/admin/users');
  });

  it('first check', () => {
    cy.contains("Users").should("exist");
  })
})