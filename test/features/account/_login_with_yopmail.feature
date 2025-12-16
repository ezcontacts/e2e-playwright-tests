@first
Feature: Login with Magic link

Scenario: Verify login email
  Given I visit the homepage
  And I navigate to the login page
  And User enters a Yopmail email
  And User clicks on the send login link button
  And opens the Yopmail inbox
  And clicks the login link in the email and check email
