@vision_test @validation
Feature: Online Vision Test Functionality
  
  Background:
    Given I visit the homepage
    And I have dismissed the "No Thanks" popup if present
    And the dynamic popup is closed if present
    And I navigate to the login page
    When I click the Google login button
    Then I should see the login success message

  # Scenario: Start a new vision test with user details
  #   Given I visit the Online Vision Introduction Test page
  #   When I click "start now" button
  #   Then I should see the pre-test requirements page
  #   When I provide my current prescription
  #   And I click Start Your Vision Test button
 

  # Scenario: Resume a previously started vision test
  #   Given I am on the online vision test introduction page
  #   When I click "start now" button
  #   And I click "Continue The Previous Test" button


  # Scenario: Cancel a previously started vision test
  #   Given I am on the online vision test introduction page
  #   When I click "start now" button
  #   And I click "Cancel The Previous Test" button
  #   Then I should see the pre-test requirements page


  Scenario: Access online vision test from My Account
    Given I visit the Online Vision Test page
    When I click "Take Our Online Vision Test" button
    Then I should see the vision test introduction


  # Scenario: Start a vision test for an existing order
  #   Given I am on the online vision test introduction page
  #   When I click "start now" button
  #   And I click "Create Vision Test For Your Existing Order" button
  #   And I provide my order prescription
  #   And I click Start Your Vision Test button