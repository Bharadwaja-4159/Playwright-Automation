const { test, expect } = require('@playwright/test');

test('Test Xpath', async ({browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://cosmocode.io/automation-practice-webtable/");
    const country = 'India';
    const checkbox = await page.locator(`//tr[td[strong[normalize-space(text())='${country}']]]//input[@type='checkbox']`);

    if (!(await checkbox.isChecked())){
        await checkbox.check();
        console.log(`${country} marked as visited.`);
    } else {
        console.log(`${country} was already visited.`);
    }
    await page.pause();
});
