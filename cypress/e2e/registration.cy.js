// cypress/e2e/registration.spec.js

Cypress.on('uncaught:exception', () => {
    // Return false to prevent Cypress from failing the test
    return false;
});

describe('Registration Page', () => {
    beforeEach(() => {
        // Visit the registration page before each test
        cy.visit('http://localhost:3000/registration');
    });

    it('renders the registration page with correct elements', () => {
        // Check if the registration form elements are present
        cy.get('input[placeholder="Enter email"]').should('be.visible');
        cy.get('input[placeholder="Enter password"]').should('be.visible');
        cy.get('input[placeholder="Enter username"]').should('be.visible');
        cy.contains('Date of birth').should('be.visible');
        cy.get('.ant-picker-input input[placeholder=""]').should('be.visible');

        cy.contains('Gender').should('be.visible');
        cy.get('input[type="radio"]').should('have.length', 2); // Assuming there are two radio buttons
        cy.get('button[type="submit"]').should('be.visible');
    });

    it('submits the registration form with valid data', () => {
        // Type valid registration data
        cy.get('input[placeholder="Enter email"]').type(`test+${Math.floor(Math.random() * 100)}$@gmail.com`);
        cy.get('input[placeholder="Enter password"]').type('zenya2001fdfd');
        cy.get('input[placeholder="Enter username"]').type('John Doe');

        cy.get('.ant-picker-input input[placeholder=""]').type('05.05.2006', { force: true }); // Use appropriate selector for date picker input
        cy.get('input[type="radio"]').first().check(); // Assuming "male" radio button is first
        cy.get('button[type="submit"]').click();

        // Check if the user is redirected to the homepage or dashboard
        cy.url().should('include', '/contacts'); // Adjust based on your app's routing
    });

    // Add more tests as needed for error handling, form validation, etc.
});
