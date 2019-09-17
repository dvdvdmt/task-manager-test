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

  it('shows tasks with all necessary fields', () => {
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
        expect($author.find('[data-test=author-avatar]')).to.exist;
        expect($author.find('[data-test=author-name]')).to.exist;
      });
    });
  });

  it('filters tasks', () => {
    cy.get('{task-filter}').should('exist');
    cy.get('{task-filter}').type('program');
    cy.get('{task-row}').should(($rows) => {
      expect($rows).to.have.length(1);
      expect($rows).to.contain('program');
    });
  });

  it('opens task', () => {
    cy.get('{task-row}').eq(0).click({force: true});
    cy.url().should('include', '/tasks/1');
    cy.get('{task-summary}').should('have.value', 'Task summary');
    cy.get('{task-description}').should('have.value', 'Task description');
  });

  it('creates new tasks', () => {
    cy.get('{create-task}').click();
    cy.url().should('match', /\/tasks\/\d*$/);
    cy.get('{task-summary}').should('not.have.value');
    cy.get('{task-description}').should('not.have.value');
  });
});
