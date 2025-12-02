Feature: Smoke tests for production environment

  Scenario: Verify that the homepage loads correctly
    Given I visit the homepage
    And I have dismissed the "No Thanks" popup if present
    And the dynamic popup is closed if present
    Then I should see the main image
    And I should see the search bar
    And I should see the top navigation menu
    And I should see the cart icon
    And I should see the recommended products section

