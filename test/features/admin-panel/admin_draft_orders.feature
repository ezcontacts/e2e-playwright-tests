 @admin_draft_orders @validation
Feature: Admin Order Management

  Background:
    Given I visit the admin panel page  
    When I enter valid email and password
    Then I should be redirected to the dashboard
    When I click on the "Create New Order" navigation tab
    And I enter the customer email
    Then Account info should contain the customer email
    When I confirm the shipping address
    And I confirm the billing address
    And I select the shipping method

  @desktopOnly @onlyThis
  Scenario: Admin create a draft order with a saved card
    When I select the payment
    Then The draft order should be successfully created


  @TEST_AC-1251 @desktopOnly @skip
  Scenario: Verify that Add Payment link and New pre auth section should visible when Admin user created the Draft Order
    When I do not select the payment method
    Then The draft order should be successfully created
    When I add a new item to the existing order
    And I click on the Start order processing button 
