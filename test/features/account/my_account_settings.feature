@Only
Feature: My Account - Verify The content of the Account Page

Background:
  Given the user is logged in
  And the user is on the My Account page

#-----------------------------------
# Account Settings – View Mode
#-----------------------------------

Scenario: Verify Account Settings page is displayed in view mode
  Then the Account Settings page should be displayed
  And the following fields should be visible in read-only mode:
    | Field         |
    | First Name    |
    | Last Name     |
    | Email Sign up |
    | Phone         |
    | Email         |
  And all fields should be pre-filled with logged-in user details
  And the "Edit Details" link should be visible

Scenario: Verify navigation to Edit Account Settings page
  When the user clicks on the "Edit Details" link
  Then the user should be redirected to "/account/settings/edit"

#-----------------------------------
# Edit Account Settings – UI Content
#-----------------------------------
Scenario: Verify sections available on Edit Account Settings page
  When the user clicks on the "Edit Details" link
  Then the following sections should be displayed:
    | SectionName              |
    | User Preferences          |
    | Email Preferences         |
    #| Store Credit Preferences  |
  And the following action buttons should be visible:
    | Button Name   |
    | Cancel        |
    | Save Changes  |

#-----------------------------------
# Edit Account Details
#-----------------------------------
Scenario Outline: Verify user can edit account detail fields
  When the user clicks on the "Edit Details" link
  And the user updates the "<FieldName>" field with valid data
  Then the "<FieldName>" field should reflect the updated value

  Examples:
    | FieldName     |
    | First Name    |
    | Last Name     |
    | Phone Number  |
    | New Email     |
    | Confirm Email |

#-----------------------------------
# Cancel Changes
#-----------------------------------
Scenario: Verify Cancel button discards changes
  When the user clicks on the "Edit Details" link
  And the user has updated valid account details:
    | Field        |
    | First Name   |
    | Phone Number |
  And the user clicks the "Cancel" button
  Then the user should be redirected to "/account/main"
  And the changes should not be saved

#-----------------------------------
# Save Changes
#-----------------------------------
Scenario: Verify Save Changes button updates account details
  When the user clicks on the "Edit Details" link
  And the user has updated valid account details:
    | Field          |
    | First Name     |
    | Last Name      |
    | New Email      |
  And the user clicks the "Save Changes" button
  Then the user should be redirected to "/account/settings/edit"
  And I should see a message indicating "Account settings successfully updated."