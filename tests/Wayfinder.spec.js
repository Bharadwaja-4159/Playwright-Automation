const {test, expect} = require ('@playwright/test');

test('practice', async ({page})=>
{
//const context = await browser.newContext();
//const page = await context.newPage();
await page.goto("https://mediaplanning-stg.ims.pg.com/");
await page.waitForLoadState('networkidle');
await page.locator("[type = 'email']").fill("vaka.bv@pg.com");
await page.locator("span:has-text('Next')").click();
await page.pause();
await page.locator("#username").fill("vaka.bv@pg.com");
await page.locator("#password").fill("Polkmn$889900");
await page.locator("#signOnButton").click();
await page.waitForLoadState('networkidle');
await page.pause();
//await page.locator("[aria-label='country-dropdown']").click();
await page.locator("[aria-label='country-dropdown']").fill("United States");
await page.locator("[aria-label='country-dropdown']").press('Enter');
await page.locator("[aria-label='sub-sector-dropdown']").fill("Fabric Care");
await page.locator("[aria-label='sub-sector-dropdown']").press('Enter');
await page.getByRole('button', { name: 'Save'}).click();
await page.waitForLoadState('networkidle');
await page.locator("[class='ag-group-value']").first().waitFor({ state: 'visible' });
await page.waitForTimeout(6000);



// Locator for rows and scrollable container

const listLocator = page.locator('[class="groupTitle font-inter font-semibold"]');
const scrollContainer = page.locator('div.ag-body-viewport');

let allRows = new Set();
let scrollAttempts = 0;

while (true) {
    // Capture visible rows at this scroll position
    const visibleRows = await listLocator.allTextContents();
    visibleRows.forEach(row => allRows.add(row));

    // Scroll down by a reasonable increment (e.g., 200px)
    const reachedBottom = await scrollContainer.evaluate(el => {
        const before = el.scrollTop;
        el.scrollBy(0, 200);
        return el.scrollTop === before; // If scrollTop didn't change, we're at bottom
    });

    if (reachedBottom) break; // Stop when bottom is reached

    await page.waitForTimeout(300);
    await page.waitForLoadState('networkidle');

    scrollAttempts++;
    if (scrollAttempts > 200) {
        console.warn('Max scroll attempts reached.');
        break;
    }
}

console.log([...allRows]);


});