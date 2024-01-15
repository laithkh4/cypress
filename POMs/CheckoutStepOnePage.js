class CheckoutStepOne{
    get getFirstNameInputField(){
        return cy.getElement('firstName')
    }
    get getLastNameInputField(){
        return cy.getElement('lastName')
    }
    get getPostalCodeInputField(){
        return cy.getElement('postalCode')
    }
    get getContinueBtn(){
        return cy.getElement('continue')
    }
    checkIfItsCheckStepOnePage(){
        cy.location('pathname').should('eq', '/checkout-step-one.html')
    }
}

export default new CheckoutStepOne();