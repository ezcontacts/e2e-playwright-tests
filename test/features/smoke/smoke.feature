@smoke
Feature: Smoke tests for production environment

  Background:
    Given I visit the homepage
    And I have dismissed the "No Thanks" popup if present
    And the dynamic popup is closed if present

  Scenario: Verify that the homepage loads correctly
    Then I should see the main image
    And I should see the search bar
    And I should see the top navigation menu
    And I should see the cart icon
    #And I should see the recommended products section

  @skip
  Scenario: Verify that the footer loads correctly
    Then I should see the footer with policy links
    And I should see the lowest price guarantee link
    And I should see free shipping info
    And I should see promo banner or tag if available
    And I should see the terms of service
    And I should see the footer sections:
      | section        |
      | ACCOUNT        |
      | CATEGORIES     |
      | CUSTOMER CARE  |
      | HOW TOS        |
      | RESOURCES      |
      | CONTACT US     |
    And the footer should include links:
      | linkText          |
      | Sign-in           |
      | Eyeglasses        |
      | About EZ Contacts |
      | Selecting Frames  |
      | Blog              |

  @skip
  Scenario: Verify that the filter works correctly
    Then I am on the "Eyeglasses" Page
    Then the "In Stock" filter toggle should exist
    And I should see gender filter options for "Unisex", "Women's", "Men's"
    And I should see frame type filters including "Full Rim", "Rimless", and "Semi Rim"
    And I should see the brand search input
    And I should see a list of brand checkboxes under the brand filter