describe('Home', () => {
  before(() => {
    cy.task("destroyDatabase", {})
    cy.task("startDatabase", {})
  })

  after(() => {
    cy.task("destroyDatabase", {})
  })

  it('redirect to login if not authenticated ', () => {
    cy.visit(Cypress.env('BASE_URL'));
    cy.url().should('be.equal', `${Cypress.env('BASE_URL')}/login`)
  })

  it('remain at home if authenticated', () => {
    cy.login();
    cy.visit(Cypress.env('BASE_URL'));
    cy.url().should('be.equal', `${Cypress.env('BASE_URL')}/`)
  });

  it('lists questions', () => {
    cy.get("#questions-list");
    cy.get("#questions-list").children().should('have.length', 8);
  });

  it('has ask question button', () => {
    cy.get("#ask-button").click();
    cy.url().should('be.equal', `${Cypress.env('BASE_URL')}/questions/new`)
  });

  it('has go to top button', () => {
    cy.login();
    cy.visit(Cypress.env('BASE_URL'));

    cy.scrollTo('bottom')

    cy.get("#go-to-top-button").click();

    cy.window().its('scrollY').should('equal', 0);

  });

  it('question click redirects to question detail page', () => {
    cy.get("#comments-button-1").click();
    cy.url().should('be.equal', `${Cypress.env('BASE_URL')}/questions/1`);
  });
})