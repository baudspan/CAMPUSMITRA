describe('Campus Mitra E2E Routing Navigation', () => {
  it('loads the map page by default', () => {
    cy.visit('/');
    cy.contains('Campus Mitra').should('be.visible');
  });

  it('navigates to the food preorder tab seamlessly', () => {
    cy.visit('/');
    cy.get('nav[role="navigation"]').contains('Food').click();
    cy.url().should('include', '/food');
    cy.contains('Loading menu...').should('be.visible');
  });

  it('navigates to the Itinerary checklist', () => {
    cy.visit('/events');
    cy.contains('Loading itinerary...').should('be.visible');
  });
});
