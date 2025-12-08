const { test, expect } = require('@playwright/test');

test('practice', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const product = page.locator(".card-body");
    const email = "xxxx@gmail.com";
    const item = "iphone 13 pro";
    const country = "Denmark";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("[type='email']").fill(email);
    await page.locator("[type='password']").fill("Reddy@123");
    await page.locator("[type='submit']").click();
    //await page.waitForLoadState('networkidle');
    //await page.pause();
    await product.first().waitFor();
    const count = await product.count();
    console.log(count);
    for (let i = 0; i < count; i++) {
        if (await product.nth(i).locator("b").textContent() === item) {
            //Add item to cart
            await product.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    //li [class*='info']
    await page.locator("li [class*='info']").first().waitFor();
    const bool = await page.locator(`h3:has-text('${item}')`).isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    await page.locator("[placeholder*=Country]").pressSequentially("india");
    await page.locator("[class*='results'] button").first().waitFor();
    const optionsCount = await page.locator("[class*='results'] button").count();
    console.log(optionsCount);
    for (let i = 0; i < optionsCount; i++) {
        if (await page.locator("[class*='results'] button").nth(i).textContent() === country) {
            await page.locator("[class*='results'] button").nth(i).click();
            break;
        }
    }
    //Checking email id
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("Order ID = " + orderId);
    //click on order button
    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator("tbody tr th").first().waitFor();
    const orderCount = await page.locator("tbody tr th").count();
    console.log("Order Count = " + orderCount);
    await page.pause();
    for (let i = 0; i < orderCount; i++) {
        const requireid = await page.locator("tbody tr th").nth(i).textContent();

        //to check the order id that extracted in the my orders page
        if (orderId.includes(requireid)) {
            await page.locator("tbody tr td [tabindex = '0']").nth(i).click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
