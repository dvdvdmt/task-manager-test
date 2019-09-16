Cypress.Commands.overwrite(
  'get',
  (originalFn, selector, options) => originalFn(addDataTestSelectors(selector), options),
);

/**
 * Takes a selector string and turns all {foo} to [data-test="foo"]
 * @param {string} selector - Original selector
 */
function addDataTestSelectors(selector) {
  return selector.replace(/{([-\w]+)}/g, '[data-test="$1"]');
}

const apiBaseUrl = 'http://localhost:3000';
Cypress.Commands.add('login', () => {
  cy.request({
    method: 'GET',
    url: `${apiBaseUrl}/users?name=robot`,
  })
    .then((resp) => {
      const [user] = resp.body;
      return cy.request({
        method: 'POST',
        url: `${apiBaseUrl}/sessions`,
        body: {
          userId: user.id,
        },
      });
    })
    .then((resp) => {
      const session = resp.body;
      localStorage.setItem('session', session.id);
    });
});
