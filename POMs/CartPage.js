class Cart{
    constructor(){
        this.Items = ['Sauce Labs Backpack','Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket','Sauce Labs Onesie','test.allthethings()-t-shirt-(red)']
    }
    get getContinueBtn(){
        return cy.getElement('continue-shopping')
    }
    get getCheckoutBtn(){
        return cy.getElement('checkout')
    }

    get getShopeCartBadge(){
        return cy.getElementByClass('shopping_cart_badge')
    }    
    checkIfItsCartPage(){
        cy.location('pathname').should('eq', '/cart.html')
    }

    removeItemFromTheCart(itemName){
        cy.log('inside remove')
        itemName = itemName.toLowerCase().replaceAll(' ', '-')
        cy.getElement('remove-'+itemName).click()
    }

    removeAllElementsFromCart(){
        //var Items= ['Sauce Labs Backpack','Sauce Labs Bike Light','Sauce Labs Bolt T-Shirt','Sauce Labs Fleece Jacket','Sauce Labs Onesie','Test.allTheThings() T-Shirt (Red)']
        var i = 5
        this.Items.forEach((item)=>{
        this.removeItemFromTheCart(item) 
        if(i>1){
            cy.get('.shopping_cart_badge').should('exist').should('have.text',`${i}`)
            i = i - 1
        }
        })
        cy.get('.shopping_cart_badge').should('not.exist')
    }
    checkItemExistInPage(itemName){
        cy.contains(itemName).should('exist')
    }
}

export default new Cart();