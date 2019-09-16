context('Login', () => {
  beforeEach(() => {
    cy.exec('npm run db-seed');
    cy.server();
    cy.route('/sockjs-node/*').as('webpack-dev-server');
    cy.visit('/');
    cy.clearLocalStorage();
    cy.wait('@webpack-dev-server');
  });

  it('redirects an unauthorized user to the login page', () => {
    cy.url().should('include', '/login');
  });

  it('redirects authorized user to the main page', () => {
    cy.login();
    cy.visit('/login');
    cy.url().should('not.include', '/login');
  });

  it('logs out', () => {
    cy.get('{logout}').should('not.exist');
    cy.login();
    cy.visit('/');
    cy.get('{logout}').click();
    cy.url().should('include', '/login');
    // can't reuse session after logging out
    cy.window().then((w) => {
      w.localStorage.setItem('session', '1');
    });
    cy.route('/session*').as('session-request');
    cy.visit('/');
    cy.wait('@session-request');
    cy.url().should('include', '/login');
  });

  it('allows a user to log in if name and password are correct', () => {
    cy.get('{name}').focus().type('robot');
    cy.get('{password}').focus().type('password');
    cy.get('{submit}').click();
    cy.should(() => {
      const session = localStorage.getItem('session');
      expect(session).to.exist;
    });
    cy.url().should('not.include', '/login');
  });

  it('forbids a user to log in if name and password are incorrect', () => {
    cy.get('{name}').type('invalid-robot');
    cy.get('{password}').type('invalid-password');
    cy.get('{submit}').click();
    cy.should(() => {
      const session = localStorage.getItem('session');
      expect(session).to.not.exist;
    });
    cy.url().should('include', '/login');
  });
});
