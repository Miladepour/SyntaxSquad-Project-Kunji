describe('Admin ngos', () => {
    beforeEach(() => {
      cy.task('seedDB');
      cy.loginToAuth0(
        Cypress.env('auth0_username'),
        Cypress.env('auth0_password')
      )
      cy.visit('/admin/ngos');
    });
  
    it('should display users', () => {
      cy.contains("Swaniawski-Roob").should("exist");
    })
  })