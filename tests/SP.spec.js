const {test, expect} = require ('@playwright/test');

test('practice', async ({browser})=>
{
const context = await browser.newContext();
const page = await context.newPage();
const email = "vaka.bv@pg.com";
const password = "Lufc$41592527";
await page.goto("https://strategic-planner-next-stg.ims.pg.com/strategic-planner");
await page.locator("[type='email']").fill(email);
//await page.getByText("<span>: has-text('Next')").click();
await page.locator("[jsname='V67aGc']").nth(1).click();
await page.pause();
});