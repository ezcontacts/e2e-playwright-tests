
@EZSANISOFT-5387
Feature: Account - Ez Points

Background:
  Given the user is logged in
  And the user is on the My Account page
  When the user selects "EZ Points" from the My Account menu

# Navigation to Ez Points Page
Scenario: Navigate to Ez Points section
  Then the Ez Points page should be displayed
  And the page URL should contain URL as: "/account/ezpoints"

# Page Title Verification
Scenario: Verify Ez Points page title
  Then the page should display the heading "Your EzPoints History"

# Transaction List Visibility
Scenario: Verify Ez Points transaction list is displayed
  Then the transaction history list should be visible

# Transaction Table Columns
Scenario Outline: Verify Ez Points transaction table columns
  Then the "<Column Name>" column should be visible in the transaction table

  Examples:
    | Column Name        |
    | Date               |
    | Order Number       |
    | Transaction Type   |
    | Point Status       |
    | Points             |