// cypress/e2e/registration.spec.js

import { sid } from './contants';

Cypress.on('uncaught:exception', () => {
    // Return false to prevent Cypress from failing the test
    return false;
});
// cypress/integration/profile.spec.js

describe('Profile Page', () => {
    beforeEach(async () => {
        cy.setCookie('cloud.sid', sid);
        cy.visit('http://localhost:3000/profile'); // Assuming the URL for the profile page is '/profile'
    });

    it('displays profile attributes correctly', () => {
        cy.contains('ID').next().should('contain', '123');
        cy.contains('Name').next().should('contain', 'John Doe');
        cy.contains('Gender').next().should('contain', 'Male');
        cy.contains('Email').next().should('contain', 'john@example.com');
        cy.contains('Birth Date').next().should('contain', '1990-01-01');
    });
});
