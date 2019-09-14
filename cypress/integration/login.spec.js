context('Login', () => {
  it('redirects an unauthorized user to the login page', () => {
    cy.visit('/');
    cy.url().should('include', '/login');
  });
});
