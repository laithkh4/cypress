/// <reference types="Cypress" />
import LoginPage from "../POMs/LoginPage"
import InventoryPage from "../POMs/InventoryPage"
import CartPage from "../POMs/CartPage"
import CheckoutStepOnePage from "../POMs/CheckoutStepOnePage"
import CheckoutStepTwoPage from "../POMs/CheckoutStepTwoPage"
import CheckoutCompletePage from "../POMs/CheckoutCompletePage"



describe('Standard User e2e testing!', () => {
  beforeEach('Login with Standard user',()=>{
    LoginPage.performLogin('standard_user')
    InventoryPage.checkIfItsInventoryPage()
    cy.get('.app_logo').should('have.text','Swag Labs')
    cy.get('.title').should('have.text','Products')
  })

  context('TC-1 Testing adding items to the chart ',()=>{

    it('TC-1.1 Adding 1 item and removing to it from the same page',()=> {
      InventoryPage.addItemToTheCart('Sauce Labs Backpack') 
      cy.getElementByClass('shopping_cart_badge').should('have.text','1')
      InventoryPage.removeItemFromTheCart('Sauce Labs Backpack')
      cy.get('.shopping_cart_badge').should('not.exist')
    })

    it('TC-1.2 Adding different items and removing to it from the same page',()=> {
      InventoryPage.addAllElementsToCart()
      InventoryPage.removeAllElementsFromCart()
    })

    it('TC-1.3 Adding 1 item then continue and then adding another item and removing them from the cart page ',()=> {
      InventoryPage.addItemToTheCart('Sauce Labs Backpack') 
      cy.getElementByClass('shopping_cart_badge').should('have.text','1')
      cy.getElementByClass('shopping_cart_link').click()
      cy.getElementByClass('shopping_cart_badge').should('have.text','1')
      CartPage.getContinueBtn.click()//cart page
      InventoryPage.addItemToTheCart('Sauce Labs Bike Light') 
      cy.getElementByClass('shopping_cart_badge').should('have.text','2')
      cy.getElementByClass('shopping_cart_link').click()
      cy.getElementByClass('shopping_cart_badge').should('have.text','2')
      CartPage.removeItemFromTheCart('Sauce Labs Backpack')
      cy.getElementByClass('shopping_cart_badge').should('have.text','1')
      CartPage.removeItemFromTheCart('Sauce Labs Bike Light')
      cy.get('.shopping_cart_badge').should('not.exist')// we could make this a custom command 
    })

    it('TC-1.4 Adding different items and removing to it from the cart page',()=> {
      InventoryPage.addAllElementsToCart()
      InventoryPage.getTheCartBtn.click()
      InventoryPage.removeAllElementsFromCart()
    })

  })

  context('TC-2 Testing adding items to the chart and then checkout',()=>{
    it.only('TC-2.1 Adding 1 item and then check out',()=>{
      InventoryPage.addItemToTheCart('Sauce Labs Backpack') 
      cy.getElementByClass('shopping_cart_badge').should('have.text','1')
      cy.getElementByClass('shopping_cart_link').click()

      CartPage.checkIfItsCartPage()
      cy.getElementByClass('inventory_item_price').should('have.text','$29.99')// am not sure that this okay because the price is not fixed and its might change frequently
      CartPage.checkItemExistInPage('Sauce Labs Backpack')
      CartPage.getCheckoutBtn.click()

      CheckoutStepOnePage.checkIfItsCheckStepOnePage()
      CheckoutStepOnePage.getFirstNameInputField.type('Laith')
      CheckoutStepOnePage.getLastNameInputField.type('Abu-khaizaran')
      CheckoutStepOnePage.getPostalCodeInputField.type('P521')
      CheckoutStepOnePage.getContinueBtn.click()

      CheckoutStepTwoPage.checkIfItsCheckStepTwoPage()
      CheckoutStepTwoPage.checkItemExistInPage('Sauce Labs Backpack')
      CheckoutStepTwoPage.checkItemExistInPage('$29.99')
      CheckoutStepTwoPage.checkItemExistInPage('Payment Information')
      CheckoutStepTwoPage.checkItemExistInPage('Shipping Information')
      CheckoutStepTwoPage.checkItemExistInPage('Price Total')
      CheckoutStepTwoPage.checkItemExistInPage('Item total')
      CheckoutStepTwoPage.checkItemExistInPage('Tax')
      CheckoutStepTwoPage.checkItemExistInPage('Total')//use contains instead
      CheckoutStepTwoPage.getTheFinishBtn.click()

      CheckoutCompletePage.checkIfItsCheckoutCompletePage()
      CheckoutCompletePage.getTitile.should('have.text','Checkout: Complete!')
      CheckoutCompletePage.getCompleteHeader.should('have.text','Thank you for your order!')
      CheckoutCompletePage.getCompleteText.should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
      CheckoutCompletePage.getBackToHomePageBtn.click()
      InventoryPage.checkIfItsInventoryPage()
    })
  })

  afterEach('Logout of the account',()=>{
    cy.Logout()
    LoginPage.checkIfInLoginPage()
  })
  
})