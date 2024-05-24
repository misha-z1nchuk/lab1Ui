// Handle any uncaught exceptions to prevent Cypress from failing the test
Cypress.on('uncaught:exception', () => {
    return false;
});

describe('Contacts Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
        cy.get('input[placeholder="Enter email"]').type('test@gmail.com');
        cy.get('input[placeholder="Enter password"]').type('zenya2001');
        cy.get('button[type="submit"]').click();

        cy.contains('Managing contacts').should('be.visible');
    });

    it('displays the create button', () => {
        cy.get('button[type="submit"]').should('be.visible');
    });

    it('displays the correct page title', () => {
        cy.contains('First Name').should('be.visible');
    });

    it('filters contacts based on search input', () => {
        const searchValue = 'Andriy';

        cy.get('input[placeholder="search"]').type(searchValue);
        cy.get('table').find('tbody').find('tr').should('have.length.gt', 0);
        cy.get('table')
            .find('tbody')
            .find('tr.ant-table-row') // Select only rows with the class 'ant-table-row'
            .should('have.length.greaterThan', 0) // Ensure there is at least one data row
            .first()
            .within(($row) => {
                cy.wrap($row).should('contain', searchValue);
            });
    });

    it('allows sharing contacts', () => {
        cy.get('table')
            .find('tbody')
            .find('tr.ant-table-row') // Select only rows with the class 'ant-table-row'
            .first() // Get the first row
            .within(() => {
                cy.get('a').contains('Share').click(); // Find the 'Edit' link and click it
            });
        cy.contains('Share Contact').should('be.visible');
        // Add assertions to validate the share functionality
    });

    it('allows sharing contacts', () => {
        cy.get('table')
            .find('tbody')
            .find('tr.ant-table-row') // Select only rows with the class 'ant-table-row'
            .first() // Get the first row
            .within(() => {
                cy.get('a').contains('Share').click(); // Find the 'Edit' link and click it
            });
        cy.contains('Share Contact').should('be.visible');
        // Add assertions to validate the share functionality
    });

    it('allows creating a new contact', () => {
        cy.get('button.createBtn').click();
        cy.get('.ProductModal').should('be.visible');

        const phoneNumber = generateUniquePhoneNumber();

        cy.get('input[placeholder="Enter First name"]').type('John');
        cy.get('input[placeholder="Enter Last name"]').type('Doe');
        cy.get('input[placeholder="Enter Phone number"]').type(phoneNumber);

        cy.get('.ProductModal button.ant-btn-primary').click();

        cy.get('.ProductModal').should('not.exist');

        cy.get('table tbody tr').should('have.length', 10);
    });

    // Function to generate a unique phone number
    function generateUniquePhoneNumber() {
        // Generate a random number between 100000000000 and 999999999999
        const randomNumber = Math.floor(Math.random() * 900000000000) + 100000000000;

        return `+${randomNumber}`;
    }
});
