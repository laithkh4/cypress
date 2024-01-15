class Login{

    get getUserNameInputElement(){
        return cy.getElement('username')
    }    
    get getPasswordInputElement(){
        return cy.getElement('password')
    } 
    get getLoginBtn(){
        return cy.getElement('login-button')
    }
    get getErrorbtn(){
        return cy.get('.error-button').should('exist')
    }
    get getErrorHeader(){
        return cy.getElement('error')
    }
    performLogin(username){
        cy.login(username)
    }
    checkIfInLoginPage(){
        cy.url().should('eq','https://www.saucedemo.com/')
    }
}

export default new Login();