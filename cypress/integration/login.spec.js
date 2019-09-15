context('Login', () => {
  it('redirects an unauthorized user to the login page', () => {
    cy.visit('/');
    cy.clearLocalStorage();
    cy.url().should('include', '/login');
  });

  it('allows a user to log in if name and password are correct', () => {
    cy.visit('/');
    cy.clearLocalStorage();
    cy.get('{name}').type('robot');
    cy.get('{password}').type('password');
    cy.get('{submit}').click();
    cy.should(() => {
      const session = localStorage.getItem('session');
      expect(session).to.exist;
    });
    cy.url().should('not.include', '/login');
  });

  it('forbids a user to log in if name and password are incorrect', () => {
    cy.visit('/');
    cy.clearLocalStorage();
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
