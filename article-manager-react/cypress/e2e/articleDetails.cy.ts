describe("Article Details Page", () => {
  it("successfully loads", () => {
    cy.visit("/articles/1"); // Assuming the ID is 1
    cy.contains("h1", "Article Details");
  });

  it("displays article details", () => {
    cy.visit("/articles/1"); // Assuming the ID is 1
    cy.contains(".article-title", "Test Article 1");
    cy.contains(".article-body", "This is a test article body");
    cy.contains(".article-published", "Published");
  });

  it("allows navigation to edit article page", () => {
    cy.visit("/articles/1"); // Assuming the ID is 1
    cy.contains("button", "Edit").click();
    cy.url().should("include", "/articles/edit/");
  });
});
