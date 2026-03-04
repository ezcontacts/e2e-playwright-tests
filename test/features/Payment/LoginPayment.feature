Feature: Payment Login via Magic Link

  Background:
    Given I navigate to the login page for payment


  @payment @magic-link
  Scenario: User logs in via Yopmail magic link for payment
    When User enters a Yopmail email for payment
    And User clicks on the send login link button for payment
    And opens the Yopmail inbox for payment
    And User opens the Yopmail inbox for the email
    And User navigates using the magic login link
    Then I should see the login success message for payment