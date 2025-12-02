describe("Login", () => {
  it("Deve Logar com sucesso", () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should("be.visible")
      .and("have.text", "Fernando Papito");

    cy.get('[data-cy="welcome-message"]')
      .should("be.visible")
      .and("have.text", "Olá QA, esse é o seu Dojo para aprender Automação de Testes.");

    // cy.wait(3000)

    // cy.get('button', 'type="submit"')
  });

  it("Não deve Logar com senha inválida", () => {
    cy.start()
    cy.submitLoginForm('papito@webdojo.com', 'katanahdoieahdq')

    
    cy.contains('Acesso negado! Tente novamente.').should('be.visible')
    
  });

  it("Não deve Logar com email inválido", () => {
    cy.start()
    cy.submitLoginForm('papitoInvalido@webdojo.com', 'katana123')
    
    cy.contains('Acesso negado! Tente novamente.').should('be.visible')
    
  });

});
