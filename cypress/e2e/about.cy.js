// cypress/e2e/about.spec.js

import { sid } from './contants';

Cypress.on('uncaught:exception', () => {
    // Return false to prevent Cypress from failing the test
    return false;
});

describe('About Page', () => {
    beforeEach(async () => {
        cy.setCookie('cloud.sid', sid);
        cy.visit('http://localhost:3000/about'); // Assuming the URL for the profile page is '/profile'
    });

    it('displays the about page with correct content', () => {
        // Check if the about page elements are present and have the correct content
        cy.get('div').contains('About').should('be.visible');
        cy.contains('p', 'Welcome to our contact management application!').should('be.visible');
        cy.contains('p', 'This application provides an easy way to manage your contacts.').should('be.visible');
        cy.get('ul').within(() => {
            cy.contains('li', 'Add new contacts effortlessly').should('be.visible');
            cy.contains('li', 'Update contact information with ease').should('be.visible');
            cy.contains('li', 'Delete contacts quickly').should('be.visible');
            cy.contains('li', 'Search and filter contacts efficiently').should('be.visible');
        });
    });
});
