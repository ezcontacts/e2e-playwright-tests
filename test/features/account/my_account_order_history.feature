@EZSANISOFT-5385
Feature: Account - Order History

Background:
  Given the user is logged in
  And the user is on the My Account page
  When the user selects "Order History" from the My Account menu

# Navigation – Order History
Scenario: Navigate to Order History page
  Then the user should be redirected to "/account/order-history"

# Page Structure – Header & Columns
Scenario: Verify Order History page structure
  Then the page should display the heading "Recent Orders"
  And the order list should display the following column headers:
    | titel        |
    | Order Number |
    | Order Date   |
    | Total        |
    | Order Status |
    