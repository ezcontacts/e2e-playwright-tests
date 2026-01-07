@promotions @validation @desktopOnly
Feature: Verify the Promotion Popup Screen

  Background:
    Given I visit the homepage
    When I click on promotion button
    And I click on continue button

  Scenario: Check the red strip (10% OFF) is present or not
    Then I should see the red strip indicating "10% OFF"

  Scenario: Verify validation for empty email in the promotion popup
    When I click on continue button
    Then I should see the error message "Please enter your email address." if the popup is present

  Scenario: Verify validation for invalid email in the promotion popup
    When I enter invalide value in the field
    And I click on continue button
    Then I should see the error message "Please enter a valid email address." if the popup is present

  Scenario: Verify validation for the empty mobile number in the promotion popup
    When I enter valide email in the email field
    And I click on continue button
    And I click on continue button
    Then I should see the error message "Please enter your mobile number." if the popup is present

  Scenario: Verify validation for the invalide mobile number in the promotion popup
    When I enter valide email in the email field
    And I click on continue button
    Then I should see the legal information
    When I enter invalide value in the field
    And I click on continue button
    Then I should see the error message "Please enter a 10-digit mobile number." if the popup is present
