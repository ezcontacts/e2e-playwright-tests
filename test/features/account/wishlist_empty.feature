Feature: Empty Wish List

Background:
  Given the user is logged in
 And the user is on the "Wish List" page

# When the wishlist is empty. - automation code is done.
Scenario: Verify empty Wish List message
  Then the page should display a message "There are no products in your wishlist."
  Then the page should display the following links:
  | Shop for Contact Lenses |
  | Shop for Eyeglasses     |
  | Shop for Sunglasses     | 