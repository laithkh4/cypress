/// <reference types="Cypress" />
import LoginPage from "../POMs/LoginPage"
import InventoryPage from "../POMs/InventoryPage"
import CartPage from "../POMs/CartPage"
import CheckoutStepOnePage from "../POMs/CheckoutStepOnePage"
import CheckoutStepTwoPage from "../POMs/CheckoutStepTwoPage"
import CheckoutCompletePage from "../POMs/CheckoutCompletePage"

/**
 * here i stated a static state that the 1 item that will be added is the backpack 
 * so the screen shots depends on that, and we want to make a screen shot for every
 *  item being added it will be to much not needed work because we alaready in the 
 * test case we did add all the items, but it still static because these items are 
 * the same for the page in all its state, thats why the Visual testingin my pov 
 * should be used to test the static thing in a page not if its possible to ignore 
 * the dynamic part to do generic screen shot to be used independent of the dynamic
 * data then it will be great, if not then tc should be functional because then we 
 * can verify depending on giving data, but for the current page, because its static
 * page I will take easier approch assuming it will be static, but it can be changed 
 * to adapt the dynamic data if data sources  mimiced . 
 */

describe('Standard User e2e testing!', () => {
  before('Start The Applitools Ai Visiual Testing',()=>{
    cy.eyesOpen({
      appName:'Testing Sacue Page',
      apiKey: 'InTNBdR10426DLHbF9ZPkX0E104LIbm0756AVlRrPYvo8KM110',
    })
  })
  beforeEach('Login with Standard user',()=>{
    LoginPage.visitLoginPage()
    cy.appliToolsScreenShot("Login page")
    LoginPage.performLogin('standard_user')
    InventoryPage.checkIfItsInventoryPage()
    cy.appliToolsScreenShot("|Inventory page")
    cy.getCookie('session-username').then((cookie)=>{
      if (cookie){
        var value = cookie.value
        expect(value).eq('standard_user')
      }
    })
    cy.getElementByClass('app_logo').should('have.text','Swag Labs')
    cy.getElementByClass('title').should('have.text','Products')
  })

  context('TC-1 Testing adding items to the chart ',()=>{

    it('TC-1.1 Adding 1 item and removing to it from the same page',()=> {
      InventoryPage.addItemToTheCart('Sauce Labs Backpack') 
      cy.appliToolsScreenShot("After adding 1 item")
      cy.getElementByClass('shopping_cart_badge').should('have.text','1')
      InventoryPage.removeItemFromTheCart('Sauce Labs Backpack')
      cy.get('.shopping_cart_badge').should('not.exist')
      cy.appliToolsScreenShot("|Inventory page")

    })

    it('TC-1.2 Adding different items and removing to it from the same page',()=> {
      InventoryPage.addAllElementsToCart()
      cy.appliToolsScreenShot("After adding all items")
      InventoryPage.removeAllElementsFromCart()
      cy.appliToolsScreenShot("|Inventory page")
    })

    it('TC-1.3 Adding 1 item then continue and then adding another item and removing them from the cart page ',()=> {
      InventoryPage.addItemToTheCart('Sauce Labs Backpack') 
      cy.getElementByClass('shopping_cart_badge').should('have.text','1')
      cy.appliToolsScreenShot("After adding 1 item")
      cy.getElementByClass('shopping_cart_link').click()
      cy.getElementByClass('shopping_cart_badge').should('have.text','1')
      cy.appliToolsScreenShot("After adding 1 item in cart page")
      CartPage.getContinueBtn.click()
      InventoryPage.addItemToTheCart('Sauce Labs Bike Light') 
      cy.getElementByClass('shopping_cart_badge').should('have.text','2')
      cy.appliToolsScreenShot("After adding 2 item")
      cy.getElementByClass('shopping_cart_link').click()
      cy.getElementByClass('shopping_cart_badge').should('have.text','2')
      cy.appliToolsScreenShot("After adding 2 items in cart page")
      CartPage.removeItemFromTheCart('Sauce Labs Backpack')
      cy.getElementByClass('shopping_cart_badge').should('have.text','1')
      CartPage.removeItemFromTheCart('Sauce Labs Bike Light')
      cy.appliToolsScreenShot("Cart page")

      cy.get('.shopping_cart_badge').should('not.exist')// we could make this a custom command 
    })

    it('TC-1.4 Adding different items and removing to it from the cart page',()=> {
      InventoryPage.addAllElementsToCart()
      cy.appliToolsScreenShot("After adding all items")
      InventoryPage.getTheCartBtn.click()
      cy.appliToolsScreenShot("After adding all items from cart page")
      InventoryPage.removeAllElementsFromCart()
      cy.appliToolsScreenShot("Cart Page")
    })
  
  })

  context('TC-2 Testing adding items to the chart and then checkout',()=>{
    it('TC-2.1 Adding 1 item and then check out',()=>{
      InventoryPage.addItemToTheCart('Sauce Labs Backpack') 
      cy.getElementByClass('shopping_cart_badge').should('have.text','1')
      cy.appliToolsScreenShot("After adding 1 item")
      cy.getElementByClass('shopping_cart_link').click()
      CartPage.checkIfItsCartPage()
      cy.appliToolsScreenShot("After adding 1 item in Cart Page")
      /**
       * next 2 command are not needed because of the applitools AI visual testing used before
       * 
       */
      cy.getElementByClass('inventory_item_price').should('have.text','$29.99')// am not sure that this okay because the price is not fixed and its might change frequently
      CartPage.checkItemExistInPage('Sauce Labs Backpack')
      CartPage.getCheckoutBtn.click()
      cy.appliToolsScreenShot("Checkout Page before typing")
      /**
       * We can make each of these block into a function to further decrease the number of line per tc
       * but keeping them like this make it easier to understand the tc behavior in my POV
       */
      CheckoutStepOnePage.checkIfItsCheckStepOnePage()
      CheckoutStepOnePage.getFirstNameInputField.type('Laith')
      CheckoutStepOnePage.getLastNameInputField.type('Abu-khaizaran')
      CheckoutStepOnePage.getPostalCodeInputField.type('P521')
      CheckoutStepOnePage.getContinueBtn.click()

      cy.appliToolsScreenShot("Step Two Checkout page ")
      CheckoutStepTwoPage.checkIfItsCheckStepTwoPage()
      CheckoutStepTwoPage.checkItemExistInPage('Sauce Labs Backpack')
      CheckoutStepTwoPage.checkItemExistInPage('$29.99')
      CheckoutStepTwoPage.checkItemExistInPage('Payment Information')
      CheckoutStepTwoPage.checkItemExistInPage('Shipping Information')
      CheckoutStepTwoPage.checkItemExistInPage('Price Total')
      CheckoutStepTwoPage.checkItemExistInPage('Item total')
      CheckoutStepTwoPage.checkItemExistInPage('Tax')
      CheckoutStepTwoPage.checkItemExistInPage('Total')
      CheckoutStepTwoPage.getTheFinishBtn.click()
      cy.appliToolsScreenShot("Checkout complete page")// the next steps can be removed because we are using the visual testing for that 
      CheckoutCompletePage.checkIfItsCheckoutCompletePage()
      CheckoutCompletePage.getTitile.should('have.text','Checkout: Complete!')
      CheckoutCompletePage.getCompleteHeader.should('have.text','Thank you for your order!')
      CheckoutCompletePage.getCompleteText.should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
      CheckoutCompletePage.getBackToHomePageBtn.click()
      InventoryPage.checkIfItsInventoryPage()
      cy.appliToolsScreenShot("|Inventory page")

    })

    it('TC-2.2 Adding more than 1 item and then checkout',()=>{
      InventoryPage.addAllElementsToCart()
      cy.appliToolsScreenShot("After adding all items")
      cy.getElementByClass('shopping_cart_link').click()
      CartPage.checkIfItsCartPage()
      cy.appliToolsScreenShot("After adding all items in cart page")
      var Items = ['Sauce Labs Backpack','Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket','Sauce Labs Onesie','Test.allTheThings() T-Shirt (Red)']
      Items.forEach((item)=>{
        CartPage.checkItemExistInPage(item)
      })
      CartPage.getCheckoutBtn.click()
      CheckoutStepOnePage.checkIfItsCheckStepOnePage()
      cy.appliToolsScreenShot("Checkout step one  page")
      CheckoutStepOnePage.getFirstNameInputField.type('Laith')
      CheckoutStepOnePage.getLastNameInputField.type('Abu-khaizaran')
      CheckoutStepOnePage.getPostalCodeInputField.type('P521')
      CheckoutStepOnePage.getContinueBtn.click()
      CheckoutStepTwoPage.checkIfItsCheckStepTwoPage()
      Items.forEach((item)=>{
        CartPage.checkItemExistInPage(item)
      })
      cy.appliToolsScreenShot("Checkout step two  page")
      CheckoutStepTwoPage.checkIfItsCheckStepTwoPage()
      CheckoutStepTwoPage.checkItemExistInPage('Sauce Labs Backpack')
      CheckoutStepTwoPage.checkItemExistInPage('Payment Information')
      CheckoutStepTwoPage.checkItemExistInPage('Shipping Information')
      CheckoutStepTwoPage.checkItemExistInPage('Price Total')
      CheckoutStepTwoPage.checkItemExistInPage('Item total')
      CheckoutStepTwoPage.checkItemExistInPage('Tax')
      CheckoutStepTwoPage.checkItemExistInPage('Total')
      CheckoutStepTwoPage.getTheFinishBtn.click()
      CheckoutCompletePage.checkIfItsCheckoutCompletePage()
      cy.appliToolsScreenShot("Checkout complete page")
      CheckoutCompletePage.getTitile.should('have.text','Checkout: Complete!')
      CheckoutCompletePage.getCompleteHeader.should('have.text','Thank you for your order!')
      CheckoutCompletePage.getCompleteText.should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
      CheckoutCompletePage.getBackToHomePageBtn.click()
      InventoryPage.checkIfItsInventoryPage()
      cy.appliToolsScreenShot("|Inventory page")
    })
  })

  context('TC-3 Testing Login and then remove the cookies',()=>{
    it('TC-3.1 Testing Login and removing the cookies',()=>{
      cy.clearCookie('session-username')
      cy.reload()
      LoginPage.checkIfInLoginPage()
      cy.contains(`Epic sadface: You can only access '/inventory.html' when you are logged in.`)
      cy.appliToolsScreenShot("Login page with error shown")
      cy.checkError()
    })  

    it('TC-3.2 Testing adding item and then logout and login then see if it still in cart',()=>{
      InventoryPage.addItemToTheCart('Sauce Labs Backpack') 
      cy.getElementByClass('shopping_cart_badge').should('have.text','1')
      cy.clearCookie('session-username')
      cy.reload()
      LoginPage.checkIfInLoginPage()
      cy.contains(`Epic sadface: You can only access '/inventory.html' when you are logged in.`)
      cy.appliToolsScreenShot("Login page with error shown")
      cy.checkError()
      LoginPage.performLogin('standard_user')
      cy.getElementByClass('shopping_cart_badge').should('have.text','1')
      cy.appliToolsScreenShot("Inventory page with 1 item in cart")
    }) 
  })

  afterEach('Logout of the account',()=>{
    cy.getCookie('session-username').then((cookie)=>{
      if (cookie){
        cy.Logout()
        LoginPage.checkIfInLoginPage()
      }
    })
  })
  after('After all test ran',()=>{
    cy.eyesClose()
  })

})