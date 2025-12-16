@contact_us @validation @func
Feature: Contact Us Form Submission Confirmation

  As a customer, I want to receive a confirmation message after submitting the Contact Us form So that I know my message has been sent successfully

  Background:
      Given I visit the Contact Us page

  Scenario: Submit the Contact Us form with missing required name fields
    When I click on the "My Account" link in the Contact Us page
    And I submit the form
    Then I should see a message indicating "Name is a required field"
    And I close the error modal by clicking button

  Scenario: Submit the Contact Us form with missing required message fields
    When I click on the "My Account" link in the Contact Us page
    And I enter "name" name in the Contact Us form
    And I enter "maksym@ezcontacts.com" email in the Contact Us form
    And I submit the form
    Then I should see a message indicating "Message is a required field"
    And I close the error modal by clicking button

  Scenario: Submit the Contact Us form with missing required email fields
    When I click on the "My Account" link in the Contact Us page
    And I enter "name" name in the Contact Us form
    And I submit the form
    Then I should see a message indicating "Provide a valid email address"
    And I close the error modal by clicking button

  Scenario Outline: Verify the Contact Us form supports different topics
    When I click on the "<Topic>" link in the Contact Us page
    And I open the topic dropdown
    Then I should see the available contact topics
    And I should be able to select "<Topic Value>"
    Examples:
      | Topic                | Topic Value               |
      | My Account           | my-account                |
      | My Order             | my-order                  |
      | Price Match          | ez-price-match-guarantee  |
      | Vision Insurance     | vision-insurance          |
      | Product Availabilty  | product-availabilty       |
      | Other Inquiry        | other-inquiry             |

  Scenario: Submit the Contact Us form with an invalid email
    When I click on the "My Account" link in the Contact Us page
    And I enter "name" name in the Contact Us form
    And I enter "a@mac.com" email in the Contact Us form
    And I enter "Please, ignore this message" message in the Contact Us form
    And I submit the form
    Then I should see an email error message indicating "Ooops... let’s double check"

  Scenario Outline: Verify a confirmation message after form submition
    When I click on the "<Topic>" link in the Contact Us page
    And I enter "name" name in the Contact Us form
    And I enter "maksym@ezcontacts.com" email in the Contact Us form
    And I enter "Please, ignore this message" message in the Contact Us form
    And I submit the form
    Then I should see a confirmation message indicating "Your message has been successfully sent. You will receive a response within 24 hours."
    And the form fields should be cleared
    Examples:
      | Topic                |
      | My Account           |
      | My Order             |
      | Price Match          |
      | Vision Insurance     |
      | Product Availabilty  |
      | Other Inquiry        |
