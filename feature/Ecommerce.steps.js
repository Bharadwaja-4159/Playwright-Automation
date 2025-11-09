const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const playwright = require('playwright');
const{POmanager} = require('../tests/pageobjects/POmanager');

Given('User logged into the client app URL with username {string} and password {string}', {timeout: 10*1000}, async function (username, password) {
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    this.pom = new POmanager(page); 
    
    // Navigate to the client app URL
    const landingPage = this.pom.getLandingPage();
    await landingPage.gotoURL();
    
    // Login with the provided username and password
    await landingPage.validLogin(username, password);
});

When('user select a product - {string} from the dashboard and clicks on Cart button', async function (product) {
    const dashboardPage = this.pom.getDashboardPage();

    // Select the product from the dashboard and click on the Cart button
    await dashboardPage.selectProduct(product);
});

Then('verify the product is added to the cart and click on checkout button', async function () {
   const checkoutPage = this.pom.getPlaceOrder();

   //Verify if the product is added to the cart
    await checkoutPage.checkout();
});

When('user adds a shipping information and place order by verifying the email address {string}',{timeout: 10*1000}, async function (emailid) {
    const placeOrder = this.pom.getPlaceOrder();
    await placeOrder.placeOrder(emailid);
});

Then('verify the order is placed successfully', async function () {
   const verifyOrder = this.pom.getVerifyOrder();
   await verifyOrder.verifyOrderPlacedSuccessfully();
});

Then('verify the order is displayed in the order history', async function () {
    const verifyOrderDetails = this.pom.getVerifyOrder();
    await verifyOrderDetails.verifyOrderDetails();
});


