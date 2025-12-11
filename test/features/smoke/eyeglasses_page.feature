@smoke
Feature: Smoke tests for production environment 
  Scenario: Verify that the filter works correctly
    Given I visit the eyeglasses page
    Then the "In Stock" filter toggle should exist
    And I should see gender filter options for:
      | gender  |
      | Unisex  |
      | Women's |
      | Men's   |
      | Kids    |
    And I should see frame type filters including:
      | type     |
      | Full Rim |
      | Rimless  |
      | Semi Rim |
    And I should see the brand search input
    And I should see a list of brand checkboxes under the brand filter