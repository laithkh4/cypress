 /**
  * log in to user using a username because all the users have the same password for this page!
  */
 Cypress.Commands.add('login', (username) => { 
    //cy.intercept({url:'https://www.saucedemo.com'}).as('LoginRequest')
    cy.visit('https://www.saucedemo.com')//,{ timeout: 120000 })
    if(username != null && username !=''){
        cy.getElement('username').should('exist').type(`${username}`)
        cy.getElement('password').should('exist').type('secret_sauce')
    }
    cy.getElement('login-button').should('exist').click()
   // cy.wait('@LoginRequest')
  })
/**
 * get element depend on the data test property
 */
Cypress.Commands.add('getElement', (elementName)=>{
    return cy.get(`[data-test=${elementName}]`)
})

/**
 * Checks the error message and clicks the cross button and check the input fields again
 */
Cypress.Commands.add('checkError', ()=>{
    cy.getElement('username').should('have.class', 'input_error form_input error')
    cy.getElement('password').should('have.class', 'input_error form_input error')
    cy.get('.error-button').should('exist').click()
    cy.getElement('username').should('have.class', 'input_error form_input')
    cy.getElement('password').should('have.class', 'input_error form_input')
})
