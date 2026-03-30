
Feature: Verify Guest checkout using Affirm


Scenario: Guest user completes payment using Affirm

Given I visit the sunglasses page
When I click on the first product card in the list
And I add the product to the cart
Then I should see the success message for adding the product to the cart

When I proceed to checkout
Then I should be redirected to the checkout "sign-in" page

When I enter guest user ID to proceed further
And I Click on Checkout button
Then I should be redirected to the checkout "shipping" page

When I fill the shipping address details
And I click on Continue to Payment
Then I should be redirected to the checkout "payment" page

When I complete the Affirm payment flow
Then I should see order confirmation