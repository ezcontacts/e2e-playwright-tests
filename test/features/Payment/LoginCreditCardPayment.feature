Feature: Verify Logged-in checkout using Credit Card

Background:
Given the user is logged in

Scenario: Logged in user completes payment using Credit Card
    Given I visit the sunglasses page
    When I click on the first product card in the list
    And I add the product to the cart
    Then I should see the success message for adding the product to the cart

    When I proceed to checkout
    Then I should be redirected to the checkout page

    When I enter card details for Logged In
    And I click on Place Order 
    Then I should see order confirmation
