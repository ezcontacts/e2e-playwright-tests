Feature: Overstock File Upload Validation - Advanced CSV Rules

  Background:
    Given I visit the admin panel page
    When I enter valid email and password
    Then I should be redirected to the dashboard


Scenario: Validate column order does not affect processing

  Given I navigate to Overstock page
  And user prepares overstock file "overstock-product-qty-price.csv"

  When user uploads overstock file

  Then upload should be successful
  And product should be available in grid
  And user navigates to upload history page
  And user opens latest upload details
  And system should show overstock update message
  And user removes product from overstock


Scenario: Validate unknown headers are ignored except Product

  Given I navigate to Overstock page
  And user captures existing product data
  And user prepares overstock file "overstock-invalid-headers.csv"

  When user uploads overstock file

  Then upload should be successful
  And product should be available in grid
  And user navigates to upload history page
  And user opens latest upload details
  And system should show overstock update message
  And user removes product from overstock