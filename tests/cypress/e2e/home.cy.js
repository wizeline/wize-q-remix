describe('Home', () => {
  before(() => {
    cy.task('destroyDatabase', {});
    cy.task('startDatabase', {});
  });

  after(() => {
    cy.task('destroyDatabase', {});
  });

  it('redirect to login if not authenticated ', () => {
    cy.visit('http://localhost:3000');
    cy.url().should('be.equal', 'http://localhost:3000/login');
  });

  it('remain at home if authenticated', () => {
    cy.login();
    cy.visit('http://localhost:3000');
    cy.url().should('be.equal', 'http://localhost:3000/');
  });

  it('lists questions', () => {
    cy.login();
    cy.visit('http://localhost:3000');

    cy.get('#questions-list');
    cy.get('#questions-list').children().should('have.length', 8);
  });

  it('has ask question button', () => {
    cy.login();
    cy.visit('http://localhost:3000');

    cy.get('#ask-button').click();

    cy.url().should('be.equal', 'http://localhost:3000/questions/new');
  });

  it('has go to top button', () => {
    cy.login();
    cy.visit('http://localhost:3000');

    cy.scrollTo('bottom');

    cy.get('#go-to-top-button').click();

    cy.window().its('scrollY').should('equal', 0);
  });

  it('question click redirects to question detail page', () => {
    cy.login();
    cy.visit('http://localhost:3000');

    cy.get('#comments-button-1').click();

    cy.url().should('be.equal', 'http://localhost:3000/questions/1');
  });
});
