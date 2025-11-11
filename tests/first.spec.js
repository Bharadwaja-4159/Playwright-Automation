const {test} = require ('@playwright/test');
//first test case
test('firstTestCase', async ({browser})=>
{
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://google.com");
});

test.only('secondTestCase', async ({browser})=>
    {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.w3schools.com/");
    });