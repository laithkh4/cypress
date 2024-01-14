/// <reference types="Cypress" />
describe('Standard User e2e testing!', () => {
  beforeEach('Login with Standard user',()=>{
    cy.login('standard_user')
    cy.location('pathname').should('eq', '/inventory.html')
    cy.get('.app_logo').should('have.text','Swag Labs')
    cy.get('.title').should('have.text','Products')
  })

  context('TC-1 Testing adding items to the chart ',()=>{

    it('TC-1.1 Adding 1 item and removing to it from the same page',()=> {
      cy.getElement('add-to-cart-sauce-labs-backpack').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','1')
      cy.getElement('remove-sauce-labs-backpack').should('exist').click()
      cy.get('.shopping_cart_badge').should('not.exist')
    })

    it('TC-1.2 Adding different items and removing to it from the same page',()=> {
      cy.getElement('add-to-cart-sauce-labs-backpack').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','1')
      cy.getElement('add-to-cart-sauce-labs-bike-light').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','2')
      cy.getElement('add-to-cart-sauce-labs-bolt-t-shirt').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','3')
      cy.getElement('add-to-cart-sauce-labs-fleece-jacket').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','4')
      cy.getElement('add-to-cart-sauce-labs-onesie').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','5')
      //needs the "" for the expression
      cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','6')

      //removing the itemsa and check if its removed 
      cy.getElement('remove-sauce-labs-backpack').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','5')
      cy.getElement('remove-sauce-labs-bike-light').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','4')
      cy.getElement('remove-sauce-labs-bolt-t-shirt').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','3')
      cy.getElement('remove-sauce-labs-fleece-jacket').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','2')
      cy.getElement('remove-sauce-labs-onesie').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','1')
      cy.get('[data-test="remove-test.allthethings()-t-shirt-(red)"]').click()
      cy.get('.shopping_cart_badge').should('not.exist')
    })

    it('TC-1.3 Adding 1 item then continue and then adding another item and removing them from the cart page ',()=> {
      cy.getElement('add-to-cart-sauce-labs-backpack').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','1')
      cy.get('.shopping_cart_link').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','1')
      cy.getElement('continue-shopping').should('exist').click()
      cy.getElement('add-to-cart-sauce-labs-bike-light').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','2')
      cy.get('.shopping_cart_link').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','2')
      cy.getElement('remove-sauce-labs-backpack').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','1')
      cy.getElement('remove-sauce-labs-bike-light').should('exist').click()
      cy.get('.shopping_cart_badge').should('not.exist')
    })

    it('TC-1.4 Adding different items and removing to it from the cart page',()=> {
      cy.getElement('add-to-cart-sauce-labs-backpack').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','1')
      cy.getElement('add-to-cart-sauce-labs-bike-light').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','2')
      cy.getElement('add-to-cart-sauce-labs-bolt-t-shirt').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','3')
      cy.getElement('add-to-cart-sauce-labs-fleece-jacket').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','4')
      cy.getElement('add-to-cart-sauce-labs-onesie').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','5')
      //needs the "" for the expression
      cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','6')

      //removing the items and check if its removed 
      cy.get('.shopping_cart_link').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','6')

      cy.getElement('remove-sauce-labs-backpack').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','5')
      cy.getElement('remove-sauce-labs-bike-light').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','4')
      cy.getElement('remove-sauce-labs-bolt-t-shirt').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','3')
      cy.getElement('remove-sauce-labs-fleece-jacket').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','2')
      cy.getElement('remove-sauce-labs-onesie').should('exist').click()
      cy.get('.shopping_cart_badge').should('exist').should('have.text','1')
      cy.get('[data-test="remove-test.allthethings()-t-shirt-(red)"]').click()
    })

  })

  afterEach('Logout of the account',()=>{
    cy.get('#react-burger-menu-btn').click()
    cy.get('#logout_sidebar_link').click()
  })
})