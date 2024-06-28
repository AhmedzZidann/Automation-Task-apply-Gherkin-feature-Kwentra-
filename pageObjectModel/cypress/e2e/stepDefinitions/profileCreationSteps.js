import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
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

When('I enter {string} as the first name', (firstName) => {
  const profileCreatePage = new ProfileCreatePage();
  profileCreatePage.enterFirstName(firstName);
});

When('I enter {string} as the last name', (lastName) => {
  const profileCreatePage = new ProfileCreatePage();
  profileCreatePage.enterLastName(lastName);
});

When('I click the "Save" button', () => {
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

Then('I should see an error message for the last name field', () => {
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

When('I enter {string} as the email', (email) => {
  const profileCreatePage = new ProfileCreatePage();
  profileCreatePage.enterEmail(email);
  profileCreatePage.clickSave();
});

Then('the email field should be marked as invalid', () => {
  cy.get('#email-field').should('have.class', 'error');
});

Then('I should see an error message for the email field related to the pattern', () => {
  const profileCreatePage = new ProfileCreatePage();
  profileCreatePage.emailError();
  profileCreatePage.emailpatternError();
});
