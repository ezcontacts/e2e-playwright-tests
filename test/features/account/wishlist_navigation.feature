Feature: Navigate to Wish List section
    As a logged-in user, 
    I want to navigate to the Wish List section from the My Account page, so that I can view and manage my wish list products.

Background:
  Given the user is logged in
  And the user is on the "Wish List" page

# Navigation to Wish List Page - automation code is done.
Scenario: Verify Wish List page
  Then the page should display the heading "Wish List"
  And the page URL should contain "/account/wishlist"