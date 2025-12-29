@cart_verification @validation
Feature: Cart Verification

  @desktopOnly @skip
  Scenario: Verify User can add Eyeglasses to the cart and validate cart details
    Given I visit the eyeglasses page
    When I click on the first product card in the list
    And I select the prescription type
    And I fill prescription details for the right eye
    And I fill prescription details for the left eye
    And I fill pupil, lens material, coating, and lens color
    And I add the product to the cart
    Then I should see the shopping cart title
    And I should see the cart number
    And I should see the continue shopping button
    And I should see the items section with product details
    And I should see the product name and image
    And I should see the edit button
    And I should see the remove button
    And I should see the product price and total price
    When I click the checkout button for guest users

  @onlyThis
  Scenario: Verify User can add Sunglasses to the cart and validate cart details
    Given I visit the sunglasses page
    When I click on the first product card in the list
    And I add the product to the cart
    Then I should see the shopping cart title
    And I should see the cart number
    And I should see the continue shopping button
    And I should see the items section with product details
    And I should see the product name and image
    And I should see the edit button
    And I should see the remove button
    And I should see the product price and total price
    When I click the checkout button for guest users

  @onlyThis
  Scenario: Verify User can add Contact Lenses to the cart and validate cart details
    Given I visit the contact lenses page
    When I click on the first product card in the list
    When I select contact lens details
    And I select contact lens details on Contact Lenses Product Page
    Then I should see the shopping cart title
    And I should see the cart number
    And I should see the continue shopping button
    And I should see the items section with product details
    And I should see the product name and image
    And I should see the edit button
    And I should see the remove button
    And I should see the product price and total price
    When I click the checkout button for guest users


 @TEST_EZSANISOFT-4035  @skip
	Scenario Outline: Check that the "Add Rx" button should be visible in the Cart page for Rx Sunglass and Eyeglasses
		Given I visit the product page for "<product>"
	  When I added the rx item to the card
    And I click the "Add Rx"
    Then the Rx modal iframe should be visible

    Examples:
      | product              | 
      | sunglasses with RX   | 


	@TEST_EZSANISOFT-4037  @skip
	Scenario Outline: Check that Add Rx and Edit Rx buttons should not be visible for Contact Lens, Reader, and Eyecare products
		Given I visit the product page for "<product>"
    When I added the rx item to the card
		Then the Add Rx button should not be visible for this product

    Examples:
      | product              | 
      | eye care             | 		
		

@EZSANISOFT-4319 @func  @skip
  Scenario: Confirm redirection to the Cart page when cart count is 0
    When the cart count is set to 0
    And I click on the Cart icon
    Then I should be redirected to the "/checkout/cart" page
    And the Cart page should show that there are no items


@EZSANISOFT-4320 @func  @skip
  Scenario: UI: Confirm animation on the cart count when a new item is added
    Given I navigate to the Sunglasses page
    And I have dismissed the "No Thanks" popup if present
    And the dynamic popup is closed if present
    When I add the product to the cart
    Then I should observe the Cart icon
    And the Cart count should show a jumping animation
    And I remove all items from the cart
