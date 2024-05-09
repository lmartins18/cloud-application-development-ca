describe("Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/");
    cy.contains("h1", "Welcome to Your App");
  });

  it("contains a link to the article list", () => {
    cy.visit("/");
    cy.contains("a", "View Articles").should("have.attr", "href", "/articles");
  });
});
