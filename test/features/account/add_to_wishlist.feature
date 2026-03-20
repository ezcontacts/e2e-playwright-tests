# @EZSANISOFT-5388
@first
Feature: Navigate to Wish List section
  As a logged-in user, I want to navigate to the Wish List section from the My Account page, so that I can view and manage my wish list products.

Background:
  Given the user is logged in
  And the user is on the "Wish List" page

# Navigation to Wish List Page - automation code is done.
@skip
Scenario: Verify Wish List page
  Then the page should display the heading "Wish List"
  And the page URL should contain "/account/wishlist"

# When the wishlist is empty. - automation code is done.
@skip
Scenario: Verify empty Wish List message
  Given the user is on the "Wish List" page
  Then the user clicks on the "Wish List" option from the My Account menu
  Then the page should display a message "There are no products in your wishlist."
  Then the following links should be visible:
  | Shop for Contact Lenses |
  | Shop for Eyeglasses     |
  | Shop for Sunglasses     | 

# Add to Cart Link - automation code is done.
@skip
Scenario: Verify the Add to Cart link for Wish List products
  Given the "Wish List" has at least one product
  When the user clicks the "Add to Cart" link for the product
  Then the product should be added to the cart
  Then the user should be redirected to the Cart page

# Remove from Wish List Link - automation code is done.
@skip
Scenario: Remove a product from the Wish List with confirmation
  Given the user is on the "Wish List" page
  And the "Wish List" has at least one product
  When the user clicks the "Remove" link for a product
  Then a confirmation popup should be displayed with the message "Remove from Wishlist?"
  When the user clicks "Remove" button on the confirmation popup
  And the page should display the message "There are no products in your wishlist."

# Result Count and Pagination
@skip
Scenario: Verify result count and pagination on Wish List page
  Given the user is on the "Wish List" page
  Then the wish list result count should be visible below the product list
  And the pagination controls should be visible below the wish list products

# Wish List Tile UI Validation
@skip
Scenario Outline: Verify wish list product tile details
  Given the user is viewing the "Wish List" products
  Then each wish list tile should display "<Tile Element>"

  Examples:
    | Tile Element             |
    | Product Image            |
    | Product Name             |
    | Product Attribute Details|
    | Add to Cart link         |
    | Remove link              |