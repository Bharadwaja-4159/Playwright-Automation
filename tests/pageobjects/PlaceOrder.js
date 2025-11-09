const { expect } = require('@playwright/test');
class PlaceOrder{
    constructor(page){
        this.page = page;
        this.verifySelectedProduct = page.locator("h3:has-text('IPHONE 13 PRO')");
        this.checkoutButton = page.locator("text=Checkout");
        this.searchCountry = page.locator("[placeholder*=Country]");
        this.listofCountries = page.locator("[class*='results'] button");
        this.checkeEmailid = page.locator(".user__name [type='text']");
        this.placeOrderButton = page.locator(".action__submit");
    }
async checkout(){
    const bool = await this.verifySelectedProduct.isVisible();
    expect(bool).toBeTruthy();
    await this.checkoutButton.click();
}

async placeOrder(email){
    await this.searchCountry.pressSequentially("k");
    await this.listofCountries.first().waitFor();
    const optionsCount = await this.listofCountries.count();
    console.log("Total No of Countries came in the list after searching: " + optionsCount);
    for (let i=0;i<optionsCount;i++){
        if (await this.listofCountries.nth(i).textContent()=== " Denmark"){
            await this.listofCountries.nth(i).click();
            break;
        }
    }
    //Checking email id
    await expect(this.checkeEmailid.first()).toHaveText(email);
    await this.placeOrderButton.click();
}
}
module.exports = { PlaceOrder };