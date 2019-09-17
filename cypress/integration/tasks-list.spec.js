context('Task list', () => {
  beforeEach(() => {
    cy.exec('npm run db-seed');
    cy.server();
    cy.login();
    cy.route('/tasks').as('tasks-request');
    cy.visit('/tasks');
    cy.wait('@tasks-request');
  });

  it('opens task list', () => {
    cy.url().should('include', '/tasks');
    cy.get('{task-list}').should('exist');
    cy.get('{task-row}').should(($rows) => {
      expect($rows).to.have.length(10);
    });
  });

  it.only('shows tasks with all necessary fields', () => {
    cy.get('{task-row}').should(($rows) => {
      $rows.each((_, row) => {
        const $row = Cypress.$(row);
        const $id = $row.find('[data-test=task-id]');
        const $summary = $row.find('[data-test=task-summary]');
        const $dueDate = $row.find('[data-test=task-due-date]');
        const $author = $row.find('[data-test=task-author]');
        expect($id).to.exist;
        expect($summary).to.exist;
        expect($dueDate).to.exist;
        expect($author).to.exist;
      });
    });
  });
});
