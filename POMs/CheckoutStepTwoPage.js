class CheckoutStepTwo{
    get getTheFinishBtn(){
        return cy.getElement('finish')
    }
    checkItemExistInPage(itemName){
        cy.contains(itemName).should('exist')
    }
    checkIfItsCheckStepTwoPage(){
        cy.location('pathname').should('eq', '/checkout-step-two.html')
    }
}

export default new CheckoutStepTwo();