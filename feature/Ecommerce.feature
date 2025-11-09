Feature: Client App
    Scenario: Logged in to the client app
        Given User logged into the client app URL with username "xxxx@gmail.com" and password "Reddy@123"
        When user select a product - "IPHONE 13 PRO" from the dashboard and clicks on Cart button
        Then verify the product is added to the cart and click on checkout button
        When user adds a shipping information and place order by verifying the email address "xxxx@gmail.com"
        Then verify the order is placed successfully
        Then verify the order is displayed in the order history
