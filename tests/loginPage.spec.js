const {test, expect} = require ('@playwright/test');

test('firstTestCase', async ({browser})=>
{
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
await expect (page.locator("[class='blinkingText']").nth(0)).toHaveAttribute("class", "blinkingText");

const[newPage] = await Promise.all([
    context.waitForEvent('page'),
    await page.locator("[class='blinkingText']").nth(0).press('Enter')
])
const text = await newPage.locator(".red").textContent();
console.log(text);
const arraySplit =text.split("@");
console.log(arraySplit);
const userName = arraySplit[1].split(".")[0];
console.log(userName);
await page.locator("[id = 'username']").fill(userName);
const getPassword = await page.locator("p").first().textContent();
console.log(getPassword);
const trimPassword = getPassword.split("Password is ")[1];
console.log(trimPassword);
const password = trimPassword.split(")")[0];
console.log(password);
await page.locator("[name='password']").fill(password);
await page.pause();
await page.locator("[type='checkbox']").click();
console.log(await page.locator("[type='checkbox']").isChecked());
await page.locator("[type='submit']").click();
});