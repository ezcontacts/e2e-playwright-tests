# @EZSANISOFT-5388
@first
Feature: Navigate to Wish List section
  As a logged-in user, I want to navigate to the Wish List section from the My Account page, so that I can view and manage my wish list products.

Background:
  Given the user is logged in
  #And I visited to My Account page

# Navigation to Wish List Page
Scenario: Navigate to Wish List section
  When the user clicks on the "Wish List" option from the My Account menu
  Then the page should display the heading "Wish List"
  And the page URL should contain "/account/wishlist"
  And the page should display the heading as "Wish List"

# When the wishlist is empty.
Scenario: Verify empty Wish List message
  Given the user is on the "Wish List" page
  When the user clicks on the "Wish List" option from the My Account menu
  Then the page should display a message "There are no products in your wishlist."
  Then the following links should be visible:
  | Shop for Contact Lenses |
  | Shop for Eyeglasses     |
  | Shop for Sunglasses     | 


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

# Add to Cart Link
@skip
Scenario: Add product from Wish List to Cart
  Given the user is on the "Wish List" page
  When the user clicks on the "Add to Cart" link for a wish list product
  Then the product should be added to the cart
  And the user should be redirected to the Cart page

# Remove from Wish List Link
@skip
Scenario: Remove product from Wish List
  Given the user is on the "Wish List" page
  And at least one product is available in the wish list
  When the user clicks on the "Remove" link for a wish list product
  Then the product should be removed from the wish list
  And the wish list should update accordingly
