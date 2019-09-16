context('User profile', () => {
  beforeEach(() => {
    cy.exec('npm run db-seed');
    cy.server();
    cy.route('/sockjs-node/*').as('webpack-dev-server');
    cy.route('/user*').as('user-request');
    cy.route('/session*').as('session-request');
    cy.login();
    cy.visit('/');
    cy.wait('@webpack-dev-server');
    cy.wait('@user-request');
    cy.wait('@session-request');
  });

  it('opens user profile', () => {
    cy.get('{profile-link}').click({force: true});
    cy.get('{user-profile}').should('exist');
    cy.url().should('include', '/me');
  });
});
