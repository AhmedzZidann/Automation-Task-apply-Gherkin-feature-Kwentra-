class SignInPage {

  // Locators
  usernameField = () => cy.get('#id_auth-username');
  passwordField = () => cy.get('#id_auth-password');
  loginButton = () => cy.get('#login-submit-btn');

  // Methods
  enterUsername(username) {
    this.usernameField().type(username);
  }

  enterPassword(password) {
    this.passwordField().type(password);
  }

  clickLogin() {
    this.loginButton().click();
  }
}

export default SignInPage;
