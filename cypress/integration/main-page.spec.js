context('Main page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders necessary components', () => {
    cy.get('{app}');
    cy.get('{parent}');
    cy.get('{child}');
  });
});
