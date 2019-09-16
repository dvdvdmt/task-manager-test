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

Cypress.Commands.add('login', () => {
  cy.request({
    method: 'GET',
    url: 'http://localhost:3000/users?name=robot',
  })
    .then((resp) => {
      const [{session}] = resp.body;
      window.localStorage.setItem('session', session);
    });
});
