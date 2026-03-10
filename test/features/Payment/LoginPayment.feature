Feature: Payment Login via Magic Link

  Background:
    Given I navigate to the login page for payment

  @debug
  @payment @magic-link
  Scenario: User logs in via Yopmail magic link for payment
    When User enters a Yopmail email for payment
    And User clicks on the send login link button for payment
    And opens the Yopmail inbox for payment
    And User opens the Yopmail inbox for the email
    And User navigates using the magic login link
    Then I should see the login success message for payment


    Given I visit the sunglasses page
    When I click on the first product card in the list
    And I add the product to the cart
    Then I should see the success message for adding the product to the cart

    When I proceed to checkout

    Then I should be redirected to the checkout page

    When I enter card details for Logged In

    Then I should see order confirmation