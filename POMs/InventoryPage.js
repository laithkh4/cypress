class Inventory{
    constructor(){
        this.Items = ['Sauce Labs Backpack','Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket','Sauce Labs Onesie','test.allthethings()-t-shirt-(red)']
    }

    get getTheCartBtn(){
        return cy.getElementByClass('shopping_cart_link')
    }

    get getShopeCartBadge(){
        return cy.getElementByClass('shopping_cart_badge')
    }

    get getSortingSelector(){
        return cy.getElement('product_sort_container')
    }

    get getTitle(){
        return cy.getElementByClass('title').should('exist')
    }

    get getAppLogo(){
        return  cy.getElementByClass('app_logo').should('exist')
    }

    getItemLinkeBasedOnName(itemName){
        return cy.contains(itemName)
    }

    checkIfItsInventoryPage(){
        cy.location('pathname').should('eq', '/inventory.html')
    }

    addItemToTheCart(ItemName){
        ItemName = ItemName.toLowerCase().replaceAll(' ', '-')
        cy.getElement('add-to-cart-'+ItemName).click()
    }

    addAllElementsToCart(){
        var i = 1
        this.Items.forEach((item)=>{
          this.addItemToTheCart(item) 
          cy.get('.shopping_cart_badge').should('exist').should('have.text',`${i}`)
          i = i + 1
        })
      }
    
    removeItemFromTheCart(ItemName){
        ItemName = ItemName.toLowerCase().replaceAll(' ', '-')
        cy.getElement('remove-'+ItemName).click()
    }

    removeAllElementsFromCart(){
        //var Items= ['Sauce Labs Backpack','Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket','Sauce Labs Onesie','test.allthethings()-t-shirt-(red)']
        var i = this.Items.length-1
        this.Items.forEach((item)=>{
        this.removeItemFromTheCart(item) 
        if(i>1){
            cy.get('.shopping_cart_badge').should('exist').should('have.text',`${i}`)
            i = i - 1
        }
        })
        cy.get('.shopping_cart_badge').should('not.exist')
    }
}

export default new Inventory();