Feature: Overstock File Upload Validation

  Background:
    Given I visit the admin panel page
    When I enter valid email and password
    Then I should be redirected to the dashboard

  Scenario Outline: Validate overstock upload for different file formats

    Given I navigate to Overstock page
    And user prepares overstock file "<fileName>"

    When user uploads overstock file

    Then upload should be successful
    And product should be available in grid
    And user navigates to upload history page
    And user opens latest upload details
    And system should show overstock update message
    And user removes product from overstock

    Examples:
      | fileName              |
      | overstock-product-only.csv      |
      | overstock-product-price.csv     |
      | overstock-product-qty.csv       |
      | overstock-product-price-qty.csv |