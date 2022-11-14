describe('Create Question', () => {
  const CREATE_QUESTION_URL = `${Cypress.env('BASE_URL')}/questions/new`;
  const QUESTION_TEXT = 'This is a sample question';

  before(() => {
    cy.task("destroyDatabase", {})
    cy.task("startDatabase", {})
  })

  after(() => {
    cy.task("destroyDatabase", {})
  })

  it('redirect to login if not authenticated ', () => {
    cy.visit(CREATE_QUESTION_URL);
    cy.url().should('be.equal', `${Cypress.env('BASE_URL')}/login`)
  })

  it('remain at page if authenticated', () => {
    cy.login();
    cy.visit(CREATE_QUESTION_URL);
    cy.url().should('be.equal', CREATE_QUESTION_URL)
  });

  it('has departments list', () => {
    cy.get("#department-dropdown-btn").click();

    cy.get("[aria-labelledby='department-dropdown-btn']").should('be.visible');

    cy.get("[aria-labelledby='department-dropdown-btn']").children().should('have.length', 19);
    cy.get("#department-dropdown-btn").click();
  });

  it('has locations list', () => {
    cy.get("#locations-dropdown").click();

    cy.get("[aria-labelledby='locations-dropdown']").should('be.visible');

    cy.get("[aria-labelledby='locations-dropdown']").children().should('have.length', 8);
    cy.get("#locations-dropdown").click();
  });

  it('ask button is disabled if text', () => {
    cy.get("#submit-btn").should('be.disabled');
  });

  it('user can write text to input', () => {
    cy.get("[aria-label='rdw-editor']").should('be.visible');
    cy.get("[aria-label='rdw-editor']").type(QUESTION_TEXT);
  });

  it('ask button is disabled if no department selected', () => {
    cy.get("#submit-btn").should('be.disabled');
  });

  it('user can select a department', () => {
    cy.get("#department-dropdown-btn").click();
    cy.get("[aria-labelledby='department-dropdown-btn']").first().click();
  });

  it('ask button is enabled if text minimum and department selected', () => {
    cy.get("#submit-btn").should('be.enabled');
  });

  it('user can select a location', () => {
    cy.get("#locations-dropdown").click();
    cy.get("[aria-labelledby='locations-dropdown']").first().click();
  });

  it('user can toggle post as anonymous', () => {
    cy.get("#ask-as-anonymous-toggle-slider").click();
  });

  it('user can submit question and is redirected to home', () => {
    cy.login();

    cy.get("#submit-btn").click();
    cy.contains('button', 'Submit').click();
    cy.url().should('be.equal', `${Cypress.env('BASE_URL')}/?index`);
  });

  it('new question is displayed in question list', () => {
    cy.get("#questions-list").children().eq(1);
  });

  it('new question is displayed as anonymous', () => {
    cy.get("#questions-list").children().eq(1).contains("span", "Anonymous");
  });

  it('new question is displayed with Mexico City location', () => {
    cy.get("#questions-list").children().eq(1).contains("Mexico City");
  });

  it('new question is displayed with Product department', () => {
    cy.get("#questions-list").children().eq(1).contains("Product");
  });

  it('new question is displayed with question input text', () => {
    cy.get("#questions-list").children().eq(1).contains(QUESTION_TEXT);
  });

  it('question detail of', () => {
    cy.get("#questions-list").children().eq(1).contains(QUESTION_TEXT);
  });
})