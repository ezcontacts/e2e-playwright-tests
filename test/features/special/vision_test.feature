@vision_test @validation
Feature: Online Vision Test Functionality
  
  Background:
    Given I visit the login page
    When I click the Google login button
    Then I should see the login success message

  Scenario: Start a new vision test with user details
    Given I visit the Online Vision Introduction Test page
    Then I should see the pre-test requirements page
    When I click "start now" button
    And I provide my current prescription
    And I click "Start Your Vision Test" button
    When I visit the Online Vision Introduction Test page
    And I click "start now" button
    And I click "Continue The Previous Test" button
    And I visit the Online Vision Introduction Test page
    And I click "start now" button
    And I click "Cancel The Previous Test" button

  Scenario: Access online vision test from My Account
    Given I visit the Online Vision Test page
    When I click "Take Our Online Vision Test" button
    Then I should see the vision test introduction