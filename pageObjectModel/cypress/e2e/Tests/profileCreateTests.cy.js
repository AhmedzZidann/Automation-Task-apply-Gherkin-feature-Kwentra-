import ProfileCreatePage from '../Pages/profileCreate.cy.js';
import SignInPage from '../Pages/sign-inPage.cy.js'; 

describe('Profile Creation Tests', () => {
  beforeEach(() => {
    // 1. Visit the initial URL 
    cy.visit('https://testingtasks.kwentra.com/account/login/?next=/');

    // a2. Log in using environment variables
    const signInPage = new SignInPage();
    signInPage.enterUsername('testuser');
    signInPage.enterPassword('Test_user1234');
    signInPage.clickLogin();

    // 3. Wait for successful login and redirect
    cy.url().should('eq', 'https://testingtasks.kwentra.com/'); //  redirection to a dashboard 

    // 4. Navigate to the profile creation page
    cy.visit('https://testingtasks.kwentra.com/frontoffice/#/profileslist/add'); 
  });


  it('TC1: Save with only mandatory data (first name and last name)', () => {
    const profileCreatePage = new ProfileCreatePage();
    profileCreatePage.enterFirstName('Ahmed');
    profileCreatePage.enterLastName('zidan');
    profileCreatePage.clickSave();
    // Verify that you're redirected to correct page (profileList)
    cy.wait(2000);
    cy.url().should('include', '/frontoffice/#/profileslist');
    
    
  });


  it('TC2: Save without entering any data', () => {
    const profileCreatePage = new ProfileCreatePage();
    profileCreatePage.clickSave(); 
    setTimeout(2000)
    profileCreatePage.firstNameError().should('be.visible');
    profileCreatePage.lastNameError().should('be.visible');

    // only (First name & Last name) fields are mandatory and have specific error messages
  });

  

  it('TC3: Validation for invalid email', () => {
    const profileCreatePage = new ProfileCreatePage();
    profileCreatePage.enterEmail('test'); // Incorrect email format
    
    profileCreatePage.clickSave();
    profileCreatePage.emailError();
    profileCreatePage.emailpatternError();

});
});
