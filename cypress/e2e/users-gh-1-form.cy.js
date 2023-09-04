describe('Form validation', () => {
    beforeEach(() => {
        cy.visit('/userform');
    });

    it('should display error if fields are empty', () => {
        cy.get("[type=submit]").click();
        cy.contains("Name must be at least 3 characters").should("exist");
    });

    it('should display error if name is not at least 3 characters', () => {
        cy.get("[name=name]").type("a");
        cy.get("[type=submit]").click();
        cy.contains("Name must be at least 3 characters").should("exist");
    });

    it('should display error if email is not valid', () => {
        cy.get("[type=submit]").click();
        cy.get("[name=email]").type("a");
        cy.contains("Email must be a valid email").should("exist");
    });

    it('should display error if current location is not at least 3 characters', () => {
        cy.get("[name=currentLocation]").type("a");
        cy.get("[type=submit]").click();
        cy.contains("Current Location must be at least 3 characters").should("exist");
    });

    it('should display error if pin code is not greater than 100000', () => {
        cy.get("[type=submit]").click();
        cy.get("[name=pinCode]").type("2");
        cy.contains("Pin Code must be greater than or equal to 100000").should("exist");
    });

    it('should display error if pin code is not greater than 100000', () => {
        cy.get("[name=phoneNumber]").type("2");
        cy.get("[type=submit]").click();
        cy.contains("Phone Number must be at least 10 characters").should("exist");
    });

    it('should display error if reCaptcha not completed', () => {
        cy.get("[name=name]").type("Haroon Ali");
        cy.get("[name=gender]").select("Male");
        cy.get("[name=dateOfBirth]").type("2000-08-09");
        cy.get("[name=currentLocation]").type("Manchester");
        cy.get("[name=pinCode]").type("123456");
        cy.get("[name=phoneNumber]").type("07867676563");
        cy.get("[name=qualification]").select("Cannot read or write");
        cy.get("[name=dateOfRelease]").type("2020-02-22");
        cy.get("[name=caseStatus]").select("Ongoing");
        cy.get("[type=submit]").click();
        cy.contains("Please complete the reCAPTCHA challenge.").should("exist");
    });
})