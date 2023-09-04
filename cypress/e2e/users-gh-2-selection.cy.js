describe('Form validation', () => {
    beforeEach(() => {
        cy.visit('/user-preferences');
    });

    it('should display error if nothing is selected', () => {
        cy.get("[type=submit]").click();
        cy.contains("Please select your service").should("exist");
    });
})