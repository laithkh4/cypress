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
var users = ['standard_user']//, 'problem_user', 'performance_glitch_user', 'error_user', 'visual_user']
users.forEach((username)=>{
//var username='standard_user';
describe('e2e testing!', () => {
  before('Start The Applitools Ai Visiual Testing', ()=>{
    cy.log('Currently we are testing username: ' + username)
   /* cy.eyesOpen({
      appName:'Testing Sacue Page',
      apiKey: 'WVrkXT4LykmZ1110ZGnvvH4qQu12S36W97wh016WsAAEwY110',
    })*/
  })
  beforeEach('Login',()=>{
    LoginPage.visitLoginPage()
    cy.window().then((win) => {
      if ('serviceWorker' in win.navigator) {
        win.navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            registration.unregister();
          });
        });
      } else {
        // Handle the case where serviceWorker is not supported
        cy.log('Service Worker is not supported in this browser');
      }
    });
    //cy.appliToolsScreenShot("Login page")
    LoginPage.performLogin(username)
    cy.window().then((win) => {
      if ('serviceWorker' in win.navigator) {
        win.navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            registration.unregister();
          });
        });
      } else {
        // Handle the case where serviceWorker is not supported
        cy.log('Service Worker is not supported in this browser');
      }
    });
    cy.lighthouse(
      {
        performance:70,
        accessibility:90,
        "best-practices":70,
        seo:70,
      },
      {
        formFactor: "desktop",
        screenEmulation:{
        mobile: false,
        dsiable: false,
        //width: Cypress.config("viewportWidth"),
        //height: Cypress.config("viewportHeight"),
        deviceScaleRatio: 1,
        },
        throttling: {
            rttMs: 40,
            throughputKbps: 11024,
            cpuSlowdownMultiplier: 0,
            requestLatencyMs: 0,
            downloadThroughputKbps: 0,
            uploadThroughputKbps: 0,
          },
      }
      )
    InventoryPage.checkIfItsInventoryPage()
    //cy.appliToolsScreenShot("|Inventory page")
    cy.getCookie('session-username').then((cookie)=>{
      if (cookie) {
        var value = cookie.value
        expect(value).eq(username) 
      }
    })
   InventoryPage.getAppLogo.should('have.text', 'Swag Labs')
    InventoryPage.getTitle.should('have.text', 'Products')
  })

  context('TC-1 Testing adding items to the chart ', ()=>{

    it.only('TC-1.1 Adding 1 item and removing to it from the same page', ()=> {
      InventoryPage.addItemToTheCart('Sauce Labs Backpack') 
      //cy.appliToolsScreenShot("After adding 1 item")
      InventoryPage.getShopeCartBadge.should('have.text', '1')
      InventoryPage.removeItemFromTheCart('Sauce Labs Backpack')
      cy.get('.shopping_cart_badge').should('not.exist')
      //cy.appliToolsScreenShot("|Inventory page")

    })

    it('TC-1.2 Adding different items and removing to it from the same page', ()=> {
      InventoryPage.addAllElementsToCart()
      //cy.appliToolsScreenShot("After adding all items")
      InventoryPage.removeAllElementsFromCart()
      //cy.appliToolsScreenShot("|Inventory page")
    })

    it('TC-1.3 Adding 1 item then continue and then adding another item and removing them from the cart page ', ()=> {
      InventoryPage.addItemToTheCart('Sauce Labs Backpack') 
      InventoryPage.getShopeCartBadge.should('have.text', '1')
      //cy.appliToolsScreenShot("After adding 1 item")
      cy.getElementByClass('shopping_cart_link').click()
      CartPage.getShopeCartBadge.should('have.text', '1')
      //cy.appliToolsScreenShot("After adding 1 item in cart page")
      CartPage.getContinueBtn.click()
      InventoryPage.addItemToTheCart('Sauce Labs Bike Light') 
      InventoryPage.getShopeCartBadge.should('have.text','2')
      //cy.appliToolsScreenShot("After adding 2 item")
      cy.getElementByClass('shopping_cart_link').click()
      CartPage.getShopeCartBadge.should('have.text','2')
      //cy.appliToolsScreenShot("After adding 2 items in cart page")
      CartPage.removeItemFromTheCart('Sauce Labs Backpack')
      CartPage.getShopeCartBadge.should('have.text','1')
      CartPage.removeItemFromTheCart('Sauce Labs Bike Light')
      //cy.appliToolsScreenShot("Cart page")

      cy.get('.shopping_cart_badge').should('not.exist')// we could make this a custom command 
    })

    it('TC-1.4 Adding different items and removing to it from the cart page',()=> {
      InventoryPage.addAllElementsToCart()
      //cy.appliToolsScreenShot("After adding all items")
      InventoryPage.getTheCartBtn.click()
      //cy.appliToolsScreenShot("After adding all items from cart page")
      InventoryPage.removeAllElementsFromCart()
      //cy.appliToolsScreenShot("Cart Page")
    })
  
  })

  context('TC-2 Testing adding items to the chart and then checkout',()=>{
    it('TC-2.1 Adding 1 item and then check out',()=>{
      InventoryPage.addItemToTheCart('Sauce Labs Backpack') 
      InventoryPage.getShopeCartBadge.should('have.text','1')
      //cy.appliToolsScreenShot("After adding 1 item")
      cy.getElementByClass('shopping_cart_link').click()
      CartPage.checkIfItsCartPage()
      //cy.appliToolsScreenShot("After adding 1 item in Cart Page")
      /**
       * next 2 command are not needed because of the applitools AI visual testing used before
       * 
       */
      cy.getElementByClass('inventory_item_price').should('have.text','$29.99')// am not sure that this okay because the price is not fixed and its might change frequently
      CartPage.checkItemExistInPage('Sauce Labs Backpack')
      CartPage.getCheckoutBtn.click()
      //cy.appliToolsScreenShot("Checkout Page before typing")
      /**
       * We can make each of these block into a function to further decrease the number of line per tc
       * but keeping them like this make it easier to understand the tc behavior in my POV
       */
      CheckoutStepOnePage.checkIfItsCheckStepOnePage()
      CheckoutStepOnePage.getFirstNameInputField.type('Laith')
      CheckoutStepOnePage.getLastNameInputField.type('Abu-khaizaran')
      CheckoutStepOnePage.getPostalCodeInputField.type('P521')
      CheckoutStepOnePage.getContinueBtn.click()

      //cy.appliToolsScreenShot("Step Two Checkout page ")
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
      //cy.appliToolsScreenShot("Checkout complete page")// the next steps can be removed because we are using the visual testing for that 
      CheckoutCompletePage.checkIfItsCheckoutCompletePage()
      CheckoutCompletePage.getTitile.should('have.text','Checkout: Complete!')
      CheckoutCompletePage.getCompleteHeader.should('have.text','Thank you for your order!')
      CheckoutCompletePage.getCompleteText.should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
      CheckoutCompletePage.getBackToHomePageBtn.click()
      InventoryPage.checkIfItsInventoryPage()
      //cy.appliToolsScreenShot("|Inventory page")

    })

    it('TC-2.2 Adding more than 1 item and then checkout',()=>{
      InventoryPage.addAllElementsToCart()
      //cy.appliToolsScreenShot("After adding all items")
      cy.getElementByClass('shopping_cart_link').click()
      CartPage.checkIfItsCartPage()
      //cy.appliToolsScreenShot("After adding all items in cart page")
      var Items = ['Sauce Labs Backpack','Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket','Sauce Labs Onesie','Test.allTheThings() T-Shirt (Red)']
      Items.forEach((item)=>{
        CartPage.checkItemExistInPage(item)
      })
      CartPage.getCheckoutBtn.click()
      CheckoutStepOnePage.checkIfItsCheckStepOnePage()
      //cy.appliToolsScreenShot("Checkout step one  page")
      CheckoutStepOnePage.getFirstNameInputField.type('Laith')
      CheckoutStepOnePage.getLastNameInputField.type('Abu-khaizaran')
      CheckoutStepOnePage.getPostalCodeInputField.type('P521')
      CheckoutStepOnePage.getContinueBtn.click()
      CheckoutStepTwoPage.checkIfItsCheckStepTwoPage()
      Items.forEach((item)=>{
        CartPage.checkItemExistInPage(item)
      })
      //cy.appliToolsScreenShot("Checkout step two  page")
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
      //cy.appliToolsScreenShot("Checkout complete page")
      CheckoutCompletePage.getTitile.should('have.text','Checkout: Complete!')
      CheckoutCompletePage.getCompleteHeader.should('have.text','Thank you for your order!')
      CheckoutCompletePage.getCompleteText.should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
      CheckoutCompletePage.getBackToHomePageBtn.click()
      InventoryPage.checkIfItsInventoryPage()
      //cy.appliToolsScreenShot("|Inventory page")
    })
  })

  context('TC-3 Testing Login and then remove the cookies',()=>{
    it('TC-3.1 Testing Login and removing the cookies',()=>{
      cy.clearCookie('session-username')
      cy.reload()
      LoginPage.checkIfInLoginPage()
      cy.contains(`Epic sadface: You can only access '/inventory.html' when you are logged in.`)
      //cy.appliToolsScreenShot("Login page with error shown")
      cy.checkError()
    })  

    it('TC-3.2 Testing adding item and then logout and login then see if it still in cart',()=>{
      InventoryPage.addItemToTheCart('Sauce Labs Backpack') 
      InventoryPage.getShopeCartBadge.should('have.text','1')
      cy.clearCookie('session-username')
      cy.reload()
      LoginPage.checkIfInLoginPage()
      cy.contains(`Epic sadface: You can only access '/inventory.html' when you are logged in.`)
      //cy.appliToolsScreenShot("Login page with error shown")
      cy.checkError()
      LoginPage.performLogin(username)
      InventoryPage.getShopeCartBadge.should('have.text','1')
      //cy.appliToolsScreenShot("Inventory page with 1 item in cart")
    }) 
  })

  context('TC-4 Testing changing the order of the items',()=>{

    it('TC-4.1 Choosing the A-Z ordering',()=>{
      InventoryPage.getSortingSelector.select('Name (A to Z)')
      //cy.appliToolsScreenShot("Ordering from A-Z")
    })

    it('TC-4.2 Choosing the Z-A ordering',()=>{
      InventoryPage.getSortingSelector.select('Name (Z to A)')//this can be done also using the value :cy.getElement('product_sort_container').select('az')
      //cy.appliToolsScreenShot("Ordering from Z-A")
    })

    it('TC-4.3 Choosing the Z-A ordering',()=>{
      InventoryPage.getSortingSelector.select('Price (low to high)')//this can be done also using the value :cy.getElement('product_sort_container').select('az')
      //cy.appliToolsScreenShot("Ordering from low to high price")
    })

    it('TC-4.4 Choosing the Z-A ordering',()=>{
      InventoryPage.getSortingSelector.select('Price (high to low)')//this can be done also using the value :cy.getElement('product_sort_container').select('az')
      //cy.appliToolsScreenShot("Ordering from high to low price")
    })
  })

  context('TC-5 Testing clicking on each item ',()=>{
    it('TC-5.1 Clicking on each item back at home page',()=>{
      var Items = ['Sauce Labs Backpack','Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket','Sauce Labs Onesie','Test.allTheThings() T-Shirt (Red)']
      Items.forEach((item)=>{
        InventoryPage.getItemLinkeBasedOnName(item).click()
        InventoryPage.getItemLinkeBasedOnName(item).should('have.text',item)
        //cy.appliToolsScreenShot("Item: " + item + " Page" )
        var ItemName = item.toLowerCase().replaceAll(' ', '-')
        cy.getElement('add-to-cart-'+ItemName).click()
        InventoryPage.getShopeCartBadge.should('have.text','1')
        cy.getElement('remove-'+ItemName).click()
        cy.getElement('back-to-products').click()
      })

    })
  })
  context('TC-6 Testing the social media buttons',()=>{

    it('TC-6.1 Clicking on the twitter button',()=>{
      cy.contains('Twitter').invoke('attr','href').then((ref)=>{
        expect(ref).eq('https://twitter.com/saucelabs')
      })
    })

    it('TC-6.2 Clicking on the Facebook button',()=>{
      cy.contains('Facebook').invoke('attr','href').then((ref)=>{
        expect(ref).eq('https://www.facebook.com/saucelabs')
      })
    })

    it('TC-6.3 Clicking on the LinkedIn button',()=>{
      cy.contains('LinkedIn').invoke('attr','href').then((ref)=>{
        expect(ref).eq('https://www.linkedin.com/company/sauce-labs/')
      })
    })

  })

  afterEach('Logout of the account',()=>{
    cy.getCookie('session-username').then((cookie)=>{
      if (cookie){
        cy.Logout()
       // LoginPage.checkIfInLoginPage()
      }
      //cy.clearCookies()
      //cy.clearLocalStorage()
      cy.clearAllSessionStorage
      cy.clearAllCookies
    })
  })
  after('After all test ran',()=>{
  // cy.eyesClose()
  })

})//end of describe 

})//end of for each