class LandingPage{
    constructor(page) {
        this.page = page;
        this.emailDetails = page.locator("[type='email']");
        this.passwordDetails = page.locator("[type='password']");
        this.submitButton = page.locator("[type='submit']");
        this.product = page.locator(".card-body");
    }

async gotoURL() {
    await this.page.goto("https://rahulshettyacademy.com/client");

}
async validLogin(email, password) {
    await this.emailDetails.fill(email);
    await this.passwordDetails.fill(password);
    await this.submitButton.click();
    await this.product.first().waitFor();
    //await page.waitForLoadState('networkidle');
}
}
module.exports = { LandingPage };