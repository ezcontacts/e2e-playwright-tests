Feature: Duplicate Overstock Upload Validation

  Background:
    Given I visit the admin panel page
    When I enter valid email and password
    Then I should be redirected to the dashboard

  Scenario: Validate duplicate overstock upload

    Given I navigate to Overstock page
    And user prepares overstock file "overstock-product-price-qty.csv"

    When user uploads overstock file

    Then upload should be successful
    And user navigates to upload history page
    And user opens latest upload details
    And system should show fresh overstock message

    When user uploads overstock file again

    Then user navigates to upload history page
    And user opens latest upload details
    And system should show duplicate overstock message

    And user removes product from overstock