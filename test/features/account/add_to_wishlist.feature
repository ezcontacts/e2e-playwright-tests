@first
Feature: Navigate to Wish List section

@desktopOnly
# Navigation to Wish List Page
Scenario: Navigate to Wish List section
    Given the user is logged in
    When the user clicks on the "Wish List" option from the My Account menu
    Then the Wish List page should be displayed
    And the page URL should contain "/account/wishlist"
    And the page should display the heading as "Wish List"