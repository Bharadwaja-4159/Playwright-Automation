const { expect } = require('@playwright/test');
class VerifyOrder{

constructor(page) {
    this.page = page;
    this.extractOrderId = page.locator(".em-spacer-1 .ng-star-inserted");
    this.navigateToMyOrders = page.locator("[routerlink*='myorders']").first();
    this.getAllOrderIDs = page.locator("tbody tr th");
    this.orderId = "";
    
}
async verifyOrderPlacedSuccessfully() {
    await expect(this.page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    this.orderId = await this.extractOrderId.textContent();
    console.log("Order ID = "+this.orderId);
    //click on order button
    await this.navigateToMyOrders.first().click();
    await this.page.locator("tbody tr th").first().waitFor();

}
async verifyOrderDetails() {
const orderCount = await this.getAllOrderIDs.count();
console.log("Order Count = "+ orderCount);
for(let i=0;i<orderCount;i++){
    const requireid = await this.getAllOrderIDs.nth(i).textContent();
    //to check the order id that extracted in the my orders page
    if(this.orderId.includes(requireid)){
        await this.page.locator("tbody tr td [tabindex = '0']").nth(i).click();
        break;
    }
}
const orderIdDetails = await this.page.locator(".col-text").textContent();
console.log("Order ID Details = "+ orderIdDetails);
   expect(this.orderId.includes(orderIdDetails)).toBeTruthy();
}
}
module.exports = { VerifyOrder };