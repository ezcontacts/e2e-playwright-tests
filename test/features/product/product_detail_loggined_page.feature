@EZSANISOFT-5331
Feature: Product Detail Page – Reader Category

Background:
  Given the user is logged in
  And the user visite "READERS" page
  When I click on the first product card in the list

Scenario: Wishlist behavior based on user logged-in state
  And the user clicks the wishlist add link
  Then the user should be redirected to "/account/wishlist"

Scenario: User removes product from wishlist
  When the user clicks the wishlist heart icon
  Then the product wishlist should be active
  When the user clicks the wishlist heart icon
  Then the product wishlist should not be active