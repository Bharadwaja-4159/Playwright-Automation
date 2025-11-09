class DashboardPage{
    constructor(page) {
        this.page = page;
        this.product = page.locator(".card-body");
        this.cartButton = page.locator("[routerlink*='cart']");
    }

async selectProduct(item){
    const count =await this.product.count();
    for (let i=0;i<count;i++){
       if (await this.product.nth(i).locator("b").textContent() === item){
    //Add item to cart
            await this.product.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
await this.cartButton.click();
await this.page.locator("li [class*='info']").first().waitFor();
}
}
module.exports = { DashboardPage };