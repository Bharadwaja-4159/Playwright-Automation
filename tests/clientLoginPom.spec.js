const {test, expect} = require ('@playwright/test');
const {POmanager} = require ('./pageobjects/POmanager');
test('practice', async ({page})=>
{
const product = page.locator(".card-body");
const email = "xxxx@gmail.com";
const password = "Reddy@123";
const item = "IPHONE 13 PRO";
const pom = new POmanager(page);
//Go to the landing page and login with valid credentials
const landingPage = pom.getLandingPage();
await landingPage.gotoURL();
await landingPage.validLogin(email, password);
//Select required product in Dashboard page and click on Cart
const dashboardPage = pom.getDashboardPage();
await dashboardPage.selectProduct(item);
//Check out and Place order
const checkoutAndPlaceOrder = pom.getPlaceOrder();
await checkoutAndPlaceOrder.checkout();
await checkoutAndPlaceOrder.placeOrder(email);
//Verify if the order is placed successfully
const verifyOrder = pom.getVerifyOrder();
await verifyOrder.verifyOrderPlacedSuccessfully();
await verifyOrder.verifyOrderDetails();

});
