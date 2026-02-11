Feature: Verify the content of the My Account page

Background:
  Given the user is logged in
  When I visit the homepage
  Then the user should see the "My Account" link in the header section
  When the user clicks on the "My Account" link in the header section

Scenario: Verify navigation to My Account page
  Then the user should be redirected to "/account/main"
  And the "Account settings" option should be selected by default

#-----------------------------------
# My Account Page Options
#-----------------------------------
Scenario: Verify My Account page labels and menu options
  Then the page should display the label "My account"
  And below to that it should display the label as "Account settings"
  And the following menu options should be displayed:
    | MenuOption           |
    | Account settings     |
    | Address & Payment    |
    | Order History        |
    | Rx Information       |
    | Ez Points            |
    | Recent               |
    | Wish List            |
    | Online Vision Test   |
    | Ez Refill            |
    | Store Credit         |