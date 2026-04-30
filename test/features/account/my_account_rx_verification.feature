@EZSANISOFT-5386
Feature: My Account - Rx Verification

Background:
  Given the user is logged in
  And the user is on the My Account page

# Navigation to Rx Information
Scenario: Verify navigate to Rx Information page header, primary action and information notes
  When the user selects "Rx Information" from the My Account menu
  Then the page should display the heading "Prescription Information"
  And the user should be redirected to "/account/prescriptions"
  And the "Add a New Prescription" link should be visible and enabled
  And the page should display the following informational text:
    """
    Your recently added prescriptions are listed below. Choose a prescription from the list to shop with that specific prescription information.
    We support uploading the following file types: jpg, jpeg, png, gif, ico, pdf, doc, docx, ppt, pptx, pps, ppsx, odt.
    Maximum file upload limit : 15 MB
    """

@skip
# Saved Prescription List
Scenario: Verify saved prescription list is displayed
  Given the user has saved prescriptions
  Then a list of saved prescription records should be displayed

@skip
# Prescription Card Actions
Scenario Outline: Verify actions available for each saved prescription
  Given the user is viewing a saved prescription record
  Then the "<Action>" link should be visible
  And the "<Action>" link should be enabled

  Examples:
    | Action                    |
    | Edit Prescription         |
    | Delete Prescription       |
    | Shop with Prescription    |
    | Upload Prescription Scan  |