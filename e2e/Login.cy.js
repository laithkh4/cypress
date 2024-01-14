/// <reference types="Cypress" />
/**
 * Testing the user login for different users 
 */
describe('TC-1 Login', () => {
  it('TC-1.1 Try to click with user not entered', () => {
    cy.login('')
    cy.location('pathname').should('not.eq', '/inventory.html')
    cy.getElement('error').invoke('text').should('eq','Epic sadface: Username is required')
    cy.checkError()
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').click()
  })
  it.only('TC-1.2 Login with standard user', () => {
    var users = ['standard_user','problem_user','performance_glitch_user','error_user','visual_user']
    console.log(users);
    for(var user of users){
      cy.login(user)
      cy.location('pathname').should('eq', '/inventory.html')
      cy.get('#react-burger-menu-btn').click()
      cy.get('#logout_sidebar_link').click()
    }
  })
  it('TC-1.3 Login with locked out user', () => {
    cy.login('locked_out_user')
    cy.location('pathname').should('not.eq', '/inventory.html')
    cy.getElement('error').invoke('text').should('eq','Epic sadface: Sorry, this user has been locked out.')
    cy.checkError()
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').click()
  })
})