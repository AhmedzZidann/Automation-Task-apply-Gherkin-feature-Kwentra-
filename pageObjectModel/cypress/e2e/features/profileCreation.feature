Feature: Profile Creation

  Scenario: Save profile with only mandatory data (first name and last name)
    Given I am on the profile creation page
    When I enter "Ahmed" as the first name
    And I enter "zidan" as the last name
    And I click the "Save" button
    Then I should be redirected to the profile list page

  Scenario: Save profile without entering any data
    Given I am on the profile creation page
    When I click the "Save" button
    Then I should see an error message for the first name field
    And I should see an error message for the last name field
  

  Scenario: Save profile with invalid email format
    Given I am on the profile creation page
    When I enter "test" as the email 
    And I click the "Save" button
    Then the email field should be marked as invalid
    And I should see an error message for the email field related to the pattern
