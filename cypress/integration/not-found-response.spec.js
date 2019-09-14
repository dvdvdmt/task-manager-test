context('Not found response', () => {
  it('shows 404 error in case of invalid route', () => {
    cy.visit('/');
    cy.get('{not-found}').should('not.exist');
    cy.visit('/login');
    cy.get('{not-found}').should('not.exist');
    cy.visit('/tasks');
    cy.get('{not-found}').should('not.exist');
    cy.visit('/tasks/1');
    cy.get('{not-found}').should('not.exist');
    cy.visit('/asdf');
    cy.get('{not-found}').should('exist');
    cy.visit('/tasks/2/adfasdf');
    cy.get('{not-found}').should('exist');
  });
});
