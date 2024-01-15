class CheckoutComplete{
    get getTitile(){
        return cy.get('.title').should('exist')
    }
    get getCompleteHeader(){
        return cy.get('.complete-header').should('exist')
    }
    get getCompleteText(){
        return cy.get('.complete-text').should('exist')
    }
    get getBackToHomePageBtn(){
        return cy.getElement('back-to-products')
    }
    checkIfThePicExist(){
        cy.get('.pony_express').should('exist')
    }
    checkIfItsCheckoutCompletePage(){
        cy.location('pathname').should('eq', '/checkout-complete.html')
    }
}

export default new CheckoutComplete()