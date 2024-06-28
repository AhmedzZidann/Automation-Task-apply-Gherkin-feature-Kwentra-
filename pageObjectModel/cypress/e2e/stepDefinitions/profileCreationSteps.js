import { Given, When, And, Then } from 'cypress-cucumber-preprocessor/steps';
import ProfileCreatePage from '../Pages/profileCreate.cy.js';
import SignInPage from '../Pages/sign-inPage.cy.js'; 

// TC1: Save with only mandatory data (first name and last name)
Given('I am on the profile creation page', () => {
  cy.visit('https://testingtasks.kwentra.com/account/login/?next=/');
  const signInPage = new SignInPage();
  signInPage.enterUsername(Cypress.env('username'));
  signInPage.enterPassword(Cypress.env('password'));
  signInPage.clickLogin();
  cy.url().should('eq', 'https://testingtasks.kwentra.com/');
  cy.visit('https://testingtasks.kwentra.com/frontoffice/#/profileslist/add');
});

When('I enter "Ahmed" as the first name', (firstName) => {
  const profileCreatePage = new ProfileCreatePage();
  profileCreatePage.enterFirstName(firstName);
});

And('I enter "zidan" as the last name', (lastName) => {
  const profileCreatePage = new ProfileCreatePage();
  profileCreatePage.enterLastName(lastName);
});

And('I click the "Save" button', () => {
  const profileCreatePage = new ProfileCreatePage();
  profileCreatePage.clickSave();
});

Then('I should be redirected to the profile list page', () => {
  cy.wait(2000); // Adjust wait time as needed
  cy.url().should('include', '/frontoffice/#/profileslist');
});

// TC2: Save without entering any data
Given('I am on the profile creation page', () => {
  cy.visit('https://testingtasks.kwentra.com/account/login/?next=/');
  const signInPage = new SignInPage();
  signInPage.enterUsername(Cypress.env('username'));
  signInPage.enterPassword(Cypress.env('password'));
  signInPage.clickLogin();
  cy.url().should('eq', 'https://testingtasks.kwentra.com/');
  cy.visit('https://testingtasks.kwentra.com/frontoffice/#/profileslist/add');
});

When('I click the "Save" button', () => {
  const profileCreatePage = new ProfileCreatePage();
  profileCreatePage.clickSave();
  cy.wait(2000); 
});

Then('I should see an error message for the first name field', () => {
  const profileCreatePage = new ProfileCreatePage();
  profileCreatePage.firstNameError().should('be.visible');
});

And('I should see an error message for the last name field', () => {
  const profileCreatePage = new ProfileCreatePage();
  profileCreatePage.lastNameError().should('be.visible');
});

// TC3: Validation for invalid email
Given('I am on the profile creation page', () => {
  cy.visit('https://testingtasks.kwentra.com/account/login/?next=/');
  const signInPage = new SignInPage();
  signInPage.enterUsername(Cypress.env('username'));
  signInPage.enterPassword(Cypress.env('password'));
  signInPage.clickLogin();
  cy.url().should('eq', 'https://testingtasks.kwentra.com/');
  cy.visit('https://testingtasks.kwentra.com/frontoffice/#/profileslist/add');
});

When('I enter "test" as the email', (email) => {
  const profileCreatePage = new ProfileCreatePage();
  profileCreatePage.enterEmail(email);
  profileCreatePage.clickSave();
});

Then('the email field should be marked as invalid', () => {
  cy.get('#email-field').should('have.class', 'error');
});

And('I should see an error message for the email field related to the pattern', () => {
  const profileCreatePage = new ProfileCreatePage();
  profileCreatePage.emailError();
  profileCreatePage.emailpatternError();
});
