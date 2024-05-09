describe("Article List Page", () => {
  it("successfully loads", () => {
    cy.visit("/articles");
    cy.contains("h1", "Article List");
  });

  it("contains a list of articles", () => {
    cy.visit("/articles");
    cy.get(".article-item").should("have.length.greaterThan", 0);
  });

  it("allows navigation to article details", () => {
    cy.visit("/articles");
    cy.get(".article-item").first().click();
    cy.url().should("include", "/articles/");
  });
});
