const {expect, request, test} = require('@playwright/test');
const{APIUtils} = require('./Utils/APIUtils');
//loginpayload is an java script object
const loginPayload = {userEmail: "xxxx@gmail.com", userPassword: "Reddy@123"};
const orderPayload = {orders: [{country: "India", productOrderedId: "67a8df1ac0d3e6622a297ccb"}]};
let response;
const fakePayLoad = { data: [], message: "No Orders" };

test.beforeAll(async () => {
    const apiContext = await request.newContext({ ignoreHTTPSErrors: true });
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
    console.log(response);

    global.apiContext = apiContext; // Save apiContext for reuse
});

test('clientAppLogin', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/67c0838fc019fb1ad60f4bed",
        async route => {
            const apiResponse = await global.apiContext.fetch(route.request());
            route.fulfill({
                apiResponse,
                body: JSON.stringify(fakePayLoad),
            });
        }
    );

    await page.locator("[routerlink*='myorders']").first().click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/67c0838fc019fb1ad60f4bed");
    console.log(await page.locator(".mt-4").textContent());
});
