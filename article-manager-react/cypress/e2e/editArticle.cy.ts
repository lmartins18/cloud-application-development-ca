describe("Edit Article Page", () => {
  it("successfully loads", () => {
    cy.visit("/articles/edit/1"); // Assuming the ID is 1
    cy.contains("h1", "Edit Article");
  });

  it("allows editing an article", () => {
    cy.visit("/articles/edit/1"); // Assuming the ID is 1
    cy.get("#title").clear().type("Updated Test Article");
    cy.get("#body").clear().type("This is an updated test article body");
    cy.get("#published").uncheck();
    cy.contains("button", "Save Changes").click();
    cy.url().should("include", "/articles/");
    cy.contains(".article-title", "Updated Test Article").should("exist");
    cy.contains(".article-body", "This is an updated test article body").should(
      "exist"
    );
    cy.contains(".article-published", "Not Published").should("exist");
  });
});
