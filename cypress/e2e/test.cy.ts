//npx cypress open
describe.only('GameSearch Component', () => {
    beforeEach(() => {
        cy.visit('/deals');
    });

    it.only('should render the search input', () => {
        cy.get('input[placeholder="Enter game name"]').should('be.visible');
    });

    it.only('should allow typing in the search input', () => {
        cy.get('input[placeholder="Enter game name"]').type('Dark Souls').should('have.value', 'Dark Souls');
    });

    it.only('should display search results when typing and pressing enter', () => {
        cy.get('input[placeholder="Enter game name"]').type('Dark Souls{enter}');
        cy.get('.dealCardTitle').should('contain', 'Dark Souls');
    });

    it.only('should display search results when typing and clicking the search button', () => {
        cy.get('input[placeholder="Enter game name"]').type('Dark Souls');
        cy.get('button[type="submit"]').click();
        cy.get('.dealCardTitle').should('contain', 'Dark Souls');
    });

    it.only('should display no results message when no games are found', () => {
        cy.get('input[placeholder="Enter game name"]').type('NonExistentGame');
        cy.get('button[type="submit"]').click();
        cy.get('.noResults').should('contain', 'No games found');
    });

    it.only('should display a sorting dropdown when results are found', () => {
        cy.get('input[placeholder="Enter game name"]').type('Dark Souls{enter}');
        cy.get('.sortSelect').should('be.visible');
    });
    
    it.only('should navigate to the store site when the store button is clicked', () => {
        cy.get('input[placeholder="Enter game name"]').type('Dark Souls{enter}');
        cy.get('.dealCard').first().within(() => {
            cy.get('a.storeButton').should('have.attr', 'href').and('include', 'http');
            cy.get('a.storeButton').then(($a) => {
                const href = $a.prop('href');
                cy.request(href).its('status').should('eq', 200);
            });
        });
    });

});