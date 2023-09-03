describe('Admin users', () => {
  beforeEach(() => {
    cy.task('seedDB');
    cy.loginToAuth0(
      Cypress.env('auth0_username'),
      Cypress.env('auth0_password')
    )
    cy.visit('/admin/users');
  });

  it('should display users', () => {
    cy.contains("Kandace Hanley").should("exist");
  })
})