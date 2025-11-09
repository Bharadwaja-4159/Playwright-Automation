const {expect, request, test} = require('@playwright/test');
const{APIUtils} = require('./Utils/APIUtils');
//loginpayload is an java script object
const loginPayload = {userEmail: "xxxx@gmail.com", userPassword: "Reddy@123"};
const orderPayload = {orders: [{country: "India", productOrderedId: "67a8df1ac0d3e6622a297ccb"}]};
let response;


test.beforeAll(async()=>
{
const apiContext = await request.newContext();
const apiUtils = new APIUtils(apiContext,loginPayload);
//this will trigger the create order method and returns the response object. 
response = await apiUtils.createOrder(orderPayload);
console.log(response);

});


//test case
test('clientAppLogin', async ({page})=>
    {
    page.addInitScript(value =>{
        window.localStorage.setItem('token',value);
    },response.token);

    const product = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    //Click on myorders button
    await page.locator("[routerlink*='myorders']").first().click();
await page.locator("tbody tr th").first().waitFor();
const orderCount = await page.locator("tbody tr th").count();
console.log("Order Count = "+ orderCount);
//await page.pause();
for(let i=0;i<orderCount;i++){
    const requireid = await page.locator("tbody tr th").nth(i).textContent();
    //to check the order id that extracted in the my orders page
    if(response.orderId.includes(requireid)){
        await page.locator("tbody tr td [tabindex = '0']").nth(i).click();
        break;
    }
}
const orderIdDetails = await page.locator(".col-text").textContent();
   expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
    });
