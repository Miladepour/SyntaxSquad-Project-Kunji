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

  describe('Form validation', () => {
    beforeEach(() => {
      cy.task('seedDB');
      cy.loginToAuth0(
        Cypress.env('auth0_username'),
        Cypress.env('auth0_password')
      )
      cy.visit('/admin/ngos');
    });
  
    it('Required fields cannot be empty', () => {
        cy.contains('Add New').click();
        cy.get('[type=submit]').contains('Add').click();
        cy.contains('Please select a service.').should('exist');
        cy.contains('Please select zone.').should('exist');
        cy.contains('Organization must be at least 3 characters').should('exist');
        cy.contains('Phone Number must be at least 3 characters').should('exist');
    })
    })
