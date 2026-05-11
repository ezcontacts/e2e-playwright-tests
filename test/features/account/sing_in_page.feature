Feature: Login

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
  And the user is redirected to the <Provider> authentication page
  And the user provides valid <Provider> credentials
  And grants permission to EZContacts
  Then the user should be logged in successfully
  And the user should be redirected to the account dashboard

Examples:
  | Provider  |
  | Google    |
  | Facebook  |
  | Apple     |

@skip
Scenario Outline: Social login is cancelled by user
  When the user clicks on "Sign in with <Provider>"
  And the user cancels authentication on the <Provider> page
  Then the user should be redirected back to the EZContacts Sign In page
  And an authentication cancelled message should be displayed

Examples:
  | Provider  |
  | Google    |
  | Facebook  |
  | Apple     |

@skip
Scenario Outline: Social login fails due to invalid credentials
  When the user clicks on "Sign in with <Provider>"
  And the user enters invalid <Provider> credentials
  Then an authentication error message should be displayed
  And the user should remain on the Sign In page

Examples:
  | Provider  |
  | Google    |
  | Facebook  |
  | Apple     |

@skip
Scenario: Login using Magic Link (Email Link)
  When the user clicks on "Sign in with Email Link"
  And the user enters a registered email address
  And submits the magic link request
  Then a confirmation message should be displayed stating "We've sent a verification link to your email address."
  When the user clicks the magic link from email
  Then the user should be logged in successfully
  And the user should be redirected to the account dashboard

@skip
Scenario: Magic link login with unregistered email
  When the user clicks on "Sign in with Email Link"
  And the user enters an unregistered email address
  And submits the magic link request
  And the user clicks the magic link from email
  Then the user should be logged in successfully
  And the user should be redirected to the account dashboard

@skip
Scenario: Login using expired magic link
  Given the user has requested a magic link
  When the user clicks on an expired or invalid magic link
  Then an error message should be displayed stating "Invalid or expired token!"
  And the user should be redirected to the Sign In page

@skip
Scenario Outline: Verify login persistence after successful login
  When the user logs in using "<LoginMethod>"
  And the user refreshes the page
  Then the user should remain logged in

Examples:
  | LoginMethod |
  | Google      |
  | Facebook    |
  | Apple       |
  | Magic Link  |

@skip
Scenario Outline: Logout after login with <LoginMethod>
  Given the user is logged in using "<LoginMethod>"
  When the user clicks on Logout
  Then the user should be logged out successfully
  And the user should be redirected to the Sign In page

Examples:
  | LoginMethod |
  | Google      |
  | Facebook    |
  | Apple       |
  | Magic Link  |