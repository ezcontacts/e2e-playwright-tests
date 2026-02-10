Feature: Footer Section - Verify Contact Us Section

Background:
  Given I visit the homepage
  And the user is viewing the footer

Scenario: Verify Contact Us information text and icons
  Then the "RESOURCES" section should be displayed
  And the information text should be displayed as: "Questions? Reach out to us at 1-800-217-2020 or chat with us during business hours"
  
  And the following icons with titles should be displayed:
    | Icon           | Title |
    | icon-mobile    | Call  |
    | icon-bubble2   | Chat  |
    | icon-envelop   | Email |
    | icon-info2     | FAQ   |
    | icon-file-text | Blog  |
    | fa fa-question | Help  |

#-----------------------------------
# Contact Us Icon Navigation
#-----------------------------------
Scenario: Verify navigation and behavior of Contact Us icons
  Then the icon should have in link:
    | Icon  | Endpoint                          |
    | Call  | /help/contact-us                  |
    | Email | /help/contact-us                  |
    | FAQ   | /help/faq                         |
    | Blog  | /blog/                            |
    | Help  | /en-us                            |