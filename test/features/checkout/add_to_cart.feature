@add_to_cart @validation
Feature: Add products to cart

  Background:
    Given I visit the homepage

  @smoke  @func
  Scenario: Verify User can add sunglasses to cart
    Given I visit the sunglasses page
    When I click on the first product card in the list
    And I add the product to the cart
    Then I should see the success message for adding the product to the cart

  Scenario: Verify User can add eyeglasses to cart
    Given I visit the eyeglasses page
    When I click on the first product card in the list
    And I select the prescription type
    And I fill prescription details for the right eye
    And I fill prescription details for the left eye
    And I fill pupil, lens material, coating, and lens color
    And I add the product to the cart
    Then I should see the success message for adding the product to the cart

  @func
  Scenario: Verify User can add contact lenses to cart
    Given I visit the contact lenses page
    When I click on the first product card in the list
    When I select contact lens details
    And I select contact lens details on Contact Lenses Product Page
    Then I should see the success message for adding the product to the cart

  Scenario: Verify User can add eye care product to cart
    Given I visit the eye care page
    When I click on the first product card in the list
    When I add the product to the cart
    Then I should see the success message for adding the product to the cart
