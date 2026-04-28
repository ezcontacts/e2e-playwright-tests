@EZSANISOFT-5403
Feature: My Account - Order Details

Background:
  Given the user is logged in
  And the user is on the My Account page
  When the user selects "Order History" from the My Account menu

# Open Order Details Page
Scenario Outline: Open Order Details page for an order
  Given the user is on the Order Details page
  Then the Order Details page should be displayed
  And the page URL should contain "/account/order-detail/"

# Order Summary Information
Scenario: Verify order summary details on Order Details page
  Given the user is on the Order Details page
  Then the Order details have the following informations
    | OrderDate     |
    | Order Number  |
    | Order Total   |
    | Order Status  |

# Return and Order Status Section
Scenario: Verify return option and order status indicators
  Given the user is on the Order Details page
  Then the "start return" option from Narvar should be visible
  And the order status message "Order is being processed" should be displayed
  And the order progress states should be visible in the following order:
    | name      |
    | Ordered   |
    | Shipped   |
    | Delivered |
  And the order item details section should be displayed

# Shipping Information Section
Scenario: Verify shipping information details
  Given the user is on the Order Details page
  Then the "Shipping Address" information should be visible
  And the user can see the Shipping Method and Track my Package link
  And the user can see the "Customer Service" options
    | info          |
    | Return Policy |
    | Shipping Info |
    | Contact Us    |

# Payment and Total Information
Scenario: Verify payment and total information sections
  Given the user is on the Order Details page
  Then the payment section should be visible
  Then the Print Invoice (PDF) link should be visible
  Then the payment method should be visible
    | method           |
    | Payment Method   |
    | Billing Address  |
    | Shipping Address |
  Then the order total section should be visible
    | section             |
    | Item(s) Subtotal    |
    | Shipping & Handling |
    | Tax                 |
    | Order Total         |