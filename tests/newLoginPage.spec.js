const {test, expect} = require ('@playwright/test');

test('firstTestCase', async ({browser})=>
{
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const textContent = await page.locator(".text-center").nth(1).textContent()
console.log(textContent);
const userName = textContent.split("ername is ")[1].split("")[0];
console.log("UserName:", userName);

});