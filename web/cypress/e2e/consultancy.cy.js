describe("Formulário de consultoria", () => {
  it.only("Deve solicitar consultoria individual", () => {
    cy.start();
    cy.submitLoginForm("papito@webdojo.com", "katana123");

    // cy.contains('h4', 'Formulários')
    //     .parent()
    //     .parent()
    //     .parent()
    //     .should('be.visible')
    //     .click()

    cy.goTo("Formulários", "Consultoria");

    // cy.get('#name').type('Pamella')

    cy.get('input[placeholder="Digite seu nome completo"]').type(
      "Pamella Candeia"
    );

    cy.get("#email").type("Pamella@email.com");

    cy.get('input[placeholder="(00) 00000-0000"]')
      .type("99 99999-9999")
      .should("have.value", "(99) 99999-9999"); //validar formatação pós preenchimento conforme a máscara

    cy.get("#consultancyType").select("individual"); //pode ser value, label ou pelo prórprio texto

    // cy.contains('label', 'Tipo de Consultoria')
    //     .parent()
    //     .find('select')
    //     .select('individual')

    // cy.contains('span', 'Pessoa Física')
    //     .parent()
    //     .find('input')
    //     .click()

    cy.contains("label", "Pessoa Física")
      .find("input")
      .click()
      .should("be.checked"); //isso é legal

    cy.contains("label", "Pessoa Jurídica")
      .find("input")
      .should("be.not.checked");

    cy.get("#document")
      .type("30546125034")
      .should("have.value", "305.461.250-34");

    // Testando checkbox

    // cy.contains("label", "Instagram")
    //   .find("input")
    //   .check()
    //   .should("be.checked"); //isso é legal

    const discoveryChannnels = [
      "Instagram",
      "LinkedIn",
      "Udemy",
      "YouTube",
      "Indicação de Amigo",
    ];

    discoveryChannnels.forEach((channel) => {
      cy.contains("label", channel)
        .find("input")
        .check()
        .should("be.checked");
    });

    //TESTE DE ANEXO

    cy.get('input[type="file"]')
        .selectFile('./cypress/fixtures/document.pdf', {force: true}) // force será usado para anexo de elementos interativos com o SO não visiveis ao cypress


    // Teste de área de texto

    cy.get('#details')
        .type('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.')

    // Teste de Array e tags e simulação de teclado

    const tecs = [
        'Cypress',
        'selenium',
        'PlayWrite',
        'WebDriverIO',
        'Robot Framework'
    ]

    tecs.forEach((option) => {
        cy.get('#technologies')
            .type(option)
            .type('{Enter}') //teclas do teclado

        cy.contains('label', 'Tecnologias')
            .parent()
            .contains('span', option)
            .should('be.visible')
    })

    // cy.get('#technologies')
    //     .type('Cypress')
    //     .type('{Enter}') //teclas do teclado

    // cy.contains('label', 'Tecnologias')
    //     .parent()
    //     .contains('span', 'Cypress')
    //     .should('be.visible')

    cy.contains('label', 'termos de uso')
        .find('input')
        .check()

    cy.contains('button', 'Enviar formulário').click()

    cy.get('.modal', {timeout: 7000}) //wait until
        .should('be.visible')
        .find('.modal-content p')
        .should('be.visible')
        .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')




  });

    // Teste de erros

  it('Deve verificar os campos obrigatorios', ()=>{
    cy.start()
    cy.submitLoginForm("papito@webdojo.com", "katana123")
    cy.goTo('Formulários','Consultoria')

    cy.contains('button', 'Enviar formulário').click()

    cy.contains('label', 'Nome Completo')
        .parent()
        .find('p')
        .should('be.visible')
        .should('have.text', 'Campo obrigatório')
        .and('have.class', 'text-red-400')
        .and('have.css', 'color', 'rgb(248, 113, 113)')  //verificação visual
    
    cy.contains('label', 'Email')
        .parent()
        .find('p')
        .should('be.visible')
        .should('have.text', 'Campo obrigatório')
        .and('have.class', 'text-red-400')
        .and('have.css', 'color', 'rgb(248, 113, 113)') 

    cy.contains('label', 'termos de uso')
        .parent()
        .find('p')
        .should('be.visible')
        .should('have.text', 'Você precisa aceitar os termos de uso')
        .and('have.class', 'text-red-400')
        .and('have.css', 'color', 'rgb(248, 113, 113)') 


  });


  

});
