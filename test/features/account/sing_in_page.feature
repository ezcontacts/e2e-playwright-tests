@EZSANISOFT-5348
Feature: Sign in page

Background:
  Given I visit the login page
  
@smoke
Scenario: Verify all supported login methods are available
  Then the "Sign in with Google" button should be visible
  And the "Sign in with Facebook" button should be visible
  And the "Sign in with Apple" button should be visible
  And the "Send magic link" button should be visible

@skip
Scenario Outline: Successful social login (Google / Facebook / Apple)
  When the user clicks on "Sign in with <Provider>"
  And the user is redirected to the "<Provider>" authentication page
  And the user provides valid "<Provider>" credentials
  And grants permission to EZContacts
  Then the user should be logged in successfully
  And the user should be redirected to the account dashboard
  When the user refreshes the page
  Then the user should remain logged in

Examples:
  | Provider  |
  | Google    |
  | Facebook  |
  | Apple     |

Scenario: Successful social login Google
    When I click the Google login button
    Then I should see the login success message

@skip
Scenario: Successful social login Facebook
    When I click the Facebook login button
    Then I should see the login success message

@skip
Scenario: Successful social login Apple
    When I click the Apple login button
    Then I should see the login success message

@desktopOnly
Scenario: Magic link login with unregistered email
  Given I visit the homepage
  And I navigate to the login page
  And User enters a Yopmail email
  And User clicks on the send login link button
  And opens the Yopmail inbox
  And clicks the login link in the email and check email

Scenario: Login using expired magic link
  Given the user used on an expired or invalid magic link
  Then the user should be redirected to "/account/sign-in"
  And a "Invalid token." message should be displayed

Scenario: Logout after login
  Given the user is logged in
  When the user clicks on Logout
  Then a "You have successfully logged out." message should be displayed
  And the user should be redirected to "/account/sign-in"