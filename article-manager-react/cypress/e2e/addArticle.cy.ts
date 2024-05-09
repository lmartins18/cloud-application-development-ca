describe("Add Article Page", () => {
  it("successfully loads", () => {
    cy.visit("/articles/add");
    cy.contains("h1", "Add Article");
  });

  it("allows adding a new article", () => {
    cy.visit("/articles/add");
    cy.get("#title").type("New Test Article");
    cy.get("#body").type("This is a test article body");
    cy.get("#published").check();
    cy.contains("button", "Add Article").click();
    cy.url().should("include", "/articles");
    cy.contains(".article-item", "New Test Article").should("exist");
  });
});
