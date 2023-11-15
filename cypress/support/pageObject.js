class PageObject {
  visit(url) {
    cy.visit(url || this.url);
  }
}

export default PageObject;
