// cypress/e2e/login.spec.js

Cypress.on('uncaught:exception', () => {
    // Return false to prevent Cypress from failing the test
    return false;
});

describe('Login Page', () => {
    beforeEach(() => {
        // Visit the login page before each test
        cy.visit('http://localhost:3000/login');
    });

    it('renders the login page with correct elements', () => {
        // Check if the login form elements are present
        cy.get('input[placeholder="Enter email"]').should('be.visible');
        cy.get('input[placeholder="Enter password"]').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');
    });

    it('displays an error message for invalid login', () => {
        // Type invalid email and password
        cy.get('input[placeholder="Enter email"]').type('fdsfdsfsd');
        cy.get('input[placeholder="Enter password"]').type('zenya2001');
        cy.get('button[type="submit"]').click();

        // Check if an error message is displayed
        cy.contains('WRONG_EMAIL').should('be.visible');
    });

    it('logs in successfully with valid credentials', () => {
        // Type valid username and password
        cy.get('input[placeholder="Enter email"]').type('test@gmail.com');
        cy.get('input[placeholder="Enter password"]').type('zenya2001');
        cy.get('button[type="submit"]').click();

        // Check if the user is redirected to the homepage or dashboard
        cy.url().should('include', '/contacts'); // Adjust based on your app's routing
    });
});
