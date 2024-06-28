class ProfileCreatePage {
  // Locators
  firstNameField = () => cy.get('#first_name-field');
  lastNameField = () => cy.get('#last_name-field');
  emailField = () => cy.get('#email-field');
  saveButton = () => cy.get('#save-btn');

firstNameError = () => cy.get('[aria-describedby="first_name-required-error"]').scrollIntoView() .should('be.visible') .and('exist'); 
lastNameError = () => cy.get('#last_name-required-error');
emailError = () => cy.get('#email-field').should('have.attr', 'aria-invalid', 'true');
emailpatternError = () => cy.get('#email-field').should('have.attr', 'aria-describedby', 'email-pattern-error');

  // Methods
  enterFirstName(firstName) {
    this.firstNameField().type(firstName);
  }

  enterLastName(lastName) {
    this.lastNameField().type(lastName);
  }

  enterEmail(email) {
    this.emailField().type(email);
  }

  clickSave() {
    this.saveButton().click();
  }

  getErrorMessage(fieldName) {     // Retrieves the error message text for a specific field
    switch (fieldName) {
      case 'firstName':
        return this.firstNameError().invoke('text');
      case 'lastName':
        return this.lastNameError().invoke('text');
      case 'email':
        return this.emailError().invoke('text');
      default:
        return cy.get('.general-error-message').invoke('text'); // Fallback for a general error message
    }
  }
}

export default ProfileCreatePage;     // Makes the ProfileCreatePage class available for import in other files