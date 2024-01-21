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

    visitLoginPage(){
        cy.visit('https://www.saucedemo.com', {
            onBeforeLoad(win) {
              delete win.navigator.__proto__.serviceWorker;
            },
          })
    }
    performLogin(username){
        cy.login(username)
    }
    checkIfInLoginPage(){
        cy.url().should('eq','https://www.saucedemo.com/')
    }
}

export default new Login();