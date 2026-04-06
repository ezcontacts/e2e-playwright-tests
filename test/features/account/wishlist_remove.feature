@EZSANISOFT-5388
Feature: Remove Product from Wish List

Background:
  Given the user is logged in
  And the user is on the "Wish List" page

Scenario: Remove a product from the Wish List with confirmation
#  Given the wish list contains at least one product
  When the user clicks the "Remove" link for a product
  Then a confirmation popup should be displayed with the message "Remove from Wishlist?"
  When the user clicks "Remove" button on the confirmation popup
  And the page should display the message "There are no products in your wishlist."