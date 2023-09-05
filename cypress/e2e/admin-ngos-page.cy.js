const { be } = require("date-fns/locale");

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

  describe('CRUD', () => {  
    beforeEach(() => {
        cy.task('seedDB');
        cy.loginToAuth0(
            Cypress.env('auth0_username'),
            Cypress.env('auth0_password')
        )
        cy.visit('/admin/ngos');
        });
    it('Add NGO', () => {
        cy.contains('Add New').click();
        cy.get('#serviceDropdown').select('Legal Aid');
        cy.get('#zone').select('North');
        cy.get('#organization').type('Good People');
        cy.get('#address').type('In the middle of nowhere');
        cy.get('#contact').type('123456789');
        cy.get('#website').type('www.goodpeople.com');
        cy.get('#email_status').type('Yes');
        cy.get('#call_response').type('Yes');
        cy.get('[type=submit]').contains('Add').click();    })
    })
