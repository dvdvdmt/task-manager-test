context('Task view', () => {
  beforeEach(() => {
    cy.exec('npm run db-seed');
    cy.server();
    cy.login();
    cy.route('/tasks/*').as('task-request');
    cy.visit('/tasks/1');
    cy.wait('@task-request');
  });

  it('can edit and save task', () => {
    cy.get('{task-summary}').clear().type('123').should('have.value', '123');
    cy.get('{task-description}').clear().type('foo bar baz').should('have.value', 'foo bar baz');
    cy.get('{save-task}').click();
    cy.reload();
    cy.get('{task-summary}').should('have.value', '123');
    cy.get('{task-description}').should('have.value', 'foo bar baz');
  });
});
