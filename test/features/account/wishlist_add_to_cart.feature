@EZSANISOFT-5388
Feature: Add Wish List Product to Cart

#Background:
# Given the user is logged in
# And the user is on the "Wish List" page

Background:
  Given the user is logged in

Scenario: Add product to wishlist only if not already added
Given I visit the sunglasses page
   When I click on the first product card in the list
   And I click on the "Wish List" icon
   Then I should see the product added to the wish list

Scenario: Add a product from Wish List to Cart
Given the user is on the "Wish List" page
  When the user clicks the "Add to Cart" link for the product
  Then the product should be added to the cart
  And the user should be redirected to the Cart page