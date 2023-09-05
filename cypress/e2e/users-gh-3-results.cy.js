describe('Results', () => {
  beforeEach(() => {
    cy.task('seedDB');
  });

  it('should display ngo in results', () => {
    cy.visit('/user-preferences');
    cy.get("[name=service]").select("Legal Aid");
    cy.get("[name=location]").select("North");
    cy.get("[type=submit]").click();
    cy.contains("Swaniawski-Roob").should("exist");
  })
})