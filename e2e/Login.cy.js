/// <reference types="Cypress" />
import LoginPage from "../POMs/LoginPage"
import InventoryPage from "../POMs/InventoryPage"

/**
 * Testing the user login for different users 
 */
describe('TC-1 Login', () => {
  it('TC-1.1 Try to click with user not entered', () => {
    LoginPage.performLogin('')
    InventoryPage.checkIfItsInventoryPage()
    LoginPage.getErrorHeader.invoke('text').should('eq','Epic sadface: Username is required')
    cy.checkError()
    cy.Logout()
    LoginPage.checkIfInLoginPage()
  })
  it.only('TC-1.2 Login with standard user', () => {
    var users = ['standard_user','problem_user','performance_glitch_user','error_user','visual_user']
    console.log(users);
    for(var user of users){
      LoginPage.performLogin(user)
      InventoryPage.checkIfItsInventoryPage()
      cy.Logout()
      LoginPage.checkIfInLoginPage()
    }
  })
  it('TC-1.3 Login with locked out user', () => {
    cy.login('locked_out_user')
    InventoryPage.checkIfItsInventoryPage()
    LoginPage.getErrorHeader.invoke('text').should('eq','Epic sadface: Sorry, this user has been locked out.')
    cy.checkError()
    cy.Logout()
    LoginPage.checkIfInLoginPage()
  })
})