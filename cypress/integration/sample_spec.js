describe('My First Test', function() {
  it('Tries to visit retro page without being logged in', function() {
    cy.visit('http://localhost:8000/retro');
    expect(cy.url().should('include', '/account/signin'));
  });
});
