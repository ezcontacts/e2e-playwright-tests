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

Scenario: Successful social login Google
    When I click the Google login button
    Then I should see the login success message


Scenario: Successful social login Facebook
    When I click the Facebook login button
    And I continue login Facebook
    Then I should see the login success message

Scenario: Cancel social login Facebook
    When I click the Facebook login button
    And I cancel login Facebook
    Then a "You skipped logging in with Facebook." message should be displayed

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