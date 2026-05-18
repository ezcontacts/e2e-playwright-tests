Feature: Invalid Overstock Upload Validation

  Background:
    Given I visit the admin panel page
    When I enter valid email and password
    Then I should be redirected to the dashboard

  Scenario: Validate invalid file format

    Given I navigate to Overstock page
    And user prepares overstock file "invalid-overstock-format.csv"

    When user uploads overstock file

    Then invalid overstock format message should display

  Scenario: Validate empty overstock file

    Given I navigate to Overstock page
    And user prepares overstock file "empty-overstock.csv"

    When user uploads overstock file

    Then empty overstock file message should display

  Scenario: Validate invalid product upload

    Given I navigate to Overstock page

    And user prepares overstock file "invalid-product.csv"

    When user uploads overstock file

    Then user navigates to upload history page

    And user opens latest upload details

    And invalid product message should display

  Scenario: Validate invalid extension upload

    Given I navigate to Overstock page

    And user prepares overstock file "invalid-overstock.xlsx"

    When user uploads overstock file

    Then invalid extension message should display

    And user navigates to upload history page

    And user opens latest upload details

    And invalid product message should display