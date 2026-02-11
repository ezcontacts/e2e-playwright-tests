@EZSANISOFT-5388
Feature: Navigate to Wish List section

Background:
  Given the user is logged in
  And the user is on the My Account page

# Navigation to Wish List Page
Scenario: Navigate to Wish List section
  When the user clicks on the "Wish List" option from the My Account menu
  Then the Wish List page should be displayed
  And the page URL should contain "/account/wishlist"
  And the page should display the heading as "Wish List"

# Result Count and Pagination
Scenario: Verify result count and pagination on Wish List page
  Given the user is on the Wish List page
  Then the wish list result count should be visible below the product list
  And the pagination controls should be visible below the wish list products

# Wish List Tile UI Validation
Scenario Outline: Verify wish list product tile details
  Given the user is viewing the wish list products
  Then each wish list tile should display "<Tile Element>"

  Examples:
    | Tile Element             |
    | Product Image            |
    | Product Name             |
    | Product Attribute Details|
    | Add to Cart link         |
    | Remove link              |

# Add to Cart Link
Scenario: Add product from Wish List to Cart
  Given the user is on the Wish List page
  When the user clicks on the "Add to Cart" link for a wish list product
  Then the product should be added to the cart
  And the user should be redirected to the Cart page

# Remove from Wish List Link
Scenario: Remove product from Wish List
  Given the user is on the Wish List page
  And at least one product is available in the wish list
  When the user clicks on the "Remove" link for a wish list product
  Then the product should be removed from the wish list
  And the wish list should update accordingly


# When the wishlist is empty.
Scenario: Verify empty Wish List message
  Given the user is on the Wish List page
  And the wish list is empty
  Then the page should display a message "There are no products in your wishlist."
  And a link to "Shop for Contact Lenses", "Shop for Eyeglasses","Shop for Sunglasses" should be visible

