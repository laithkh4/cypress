 import LoginPage from "../POMs/LoginPage"
 /**
  * log in to user using a username because all the users have the same password for this page!
  */
 Cypress.Commands.add('login', (username) => { 
    //cy.intercept({url:'https://www.saucedemo.com'}).as('LoginRequest')
    cy.visit('https://www.saucedemo.com')//,{ timeout: 120000 })
    if(username != null && username !=''){
        LoginPage.getUserNameInputElement.type(`${username}`)
        LoginPage.getPasswordInputElement.type('secret_sauce')
    }
    cy.getElement('login-button').click()
   // cy.wait('@LoginRequest')
  })
/**
 * get element depend on the data test property
 */
Cypress.Commands.add('getElement', (elementName)=>{
    return cy.get(`[data-test="${elementName}"]`).should('exist')
})
/**
 * Because it more general and it can be performed from more than 1 page we are gonna make it general command 
 */
Cypress.Commands.add('Logout', ()=>{
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').click()
})
/**
 * Checks the error message and clicks the cross button and check the input fields again
 */
Cypress.Commands.add('checkError', ()=>{
    LoginPage.getUserNameInputElement.should('have.class', 'input_error form_input error')
    LoginPage.getPasswordInputElement.should('have.class', 'input_error form_input error')
    LoginPage.getErrorbtn.click()
    LoginPage.getUserNameInputElement.should('have.class', 'input_error form_input')
    LoginPage.getPasswordInputElement.should('have.class', 'input_error form_input')
})

/**
 * gets an element by the class name and check if it does exist 
 */
Cypress.Commands.add('getElementByClass', (className)=>{
    cy.get('.'+className).should('exist')
})

