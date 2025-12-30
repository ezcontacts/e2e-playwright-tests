@smoke
Feature: Smoke tests for production environment

  Background:
    Given I visit the homepage
    And I have dismissed the "No Thanks" popup if present
    And the dynamic popup is closed if present

  @desktopOnly
  Scenario: Verify that the homepage loads correctly
    Then I should see the main image
    And I should see the terms of service
    And I should see free shipping info
    And I should see the lowest price guarantee link
    And I should see promo banner or tag if available
    And I should see the search bar
    And I should see the top navigation menu
    And I should see the cart icon
    And I should see the recommended products section

  @desktopOnly
  Scenario: Verify that the footer loads correctly
    Given I should see the footer with policy links
    And I should see the footer sections:
      | section        |
      | ACCOUNT        |
      | CATEGORIES     |
      | CUSTOMER CARE  |
      | HOW TOS        |
      | RESOURCES      |
      | CONTACT US     |
    And the footer should include links in "ACCOUNT":
      | linkText          |
      | Sign-in           |
      | Eyeglasses        |
      | About EZ Contacts |
      | Selecting Frames  |
      | Blog              |

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

  #TODO: this exist error on only mobile
  @desktopOnly
  Scenario: Verify that the checkout flow works correctly
    Given I visit the sunglasses page
    When I click on the first product card in the list
    Then I should see the product title 
    And I should see the price
    And I should see at least one product image
    And I should see the frame color dropdown
    And I should see the size information
    And I should see the "Add to Cart" button
    And I should see the "Add to Wishlist" button
    And I should see shipping availability text

  Scenario: Verify that the login loads correctly
    Given I visit the login page
    Then I should see the following login options:
      | provider                |
      | Sign in with Google     |
      | Sign in with Facebook   |
      | Send magic link         |
      
  Scenario: Verify that the contact us works correctly
    Given I visit the Contact Us page
    When I click on the "My Account" link in the Contact Us page
    And I open the topic dropdown
    Then I should see the available contact topics