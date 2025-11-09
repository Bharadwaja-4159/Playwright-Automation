const {test,expect} = require ('@playwright/test');

test("Test_Calendar", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.globalsqa.com/demo-site/datepicker/#Simple%20Date%20Picker");
    const frameLocator = page.locator("iframe.demo-frame").first();
    const frame = await frameLocator.contentFrame();

    // Interact with the datepicker inside the frame
    await frame.locator(".hasDatepicker").click();
    const mmyyyy = frame.locator(".ui-datepicker-title")
    const next = await frame.getByText("Next");
    const prev = await frame.getByText("Prev");
    const date = "30";
    const selectDate = await frame.locator(`//a[@class='ui-state-default'][text()='${date}']`);
    let requiredMMYYYY = "August 2025";
    // Wait for the calendar title to be visible before starting the loop
    await mmyyyy.waitFor();
    const presentMMYYYY = await mmyyyy.textContent();
    console.log(presentMMYYYY);
    // Loop until the desired month and year are displayed

    while(await mmyyyy.textContent() !== requiredMMYYYY){
       const currentMMYYYY = await mmyyyy.textContent();
        // Extract month and year for comparison
        const [currentMonth, currentYear] = currentMMYYYY.split(" ");
        const [requiredMonth, requiredYear] = requiredMMYYYY.split(" ");

        if (
            Number(currentYear) < Number(requiredYear) ||
            (Number(currentYear) === Number(requiredYear) &&
             new Date(`${requiredMonth} 1, 2000`) > new Date(`${currentMonth} 1, 2000`))
        ) {
            await next.click();
        } else {
            await prev.click();
        }
        await page.waitForTimeout(200); 
    }
    await selectDate.click();
    await page.pause();
});

