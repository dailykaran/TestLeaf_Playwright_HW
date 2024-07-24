import {chromium, test} from "@playwright/test";

test('Lanuch the browser', async() => {
    const browser = await chromium.launch({headless: true, channel: "chrome"});
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();

    await page.goto("https://login.salesforce.com/");

    await page.locator("#username_container input.input.username").fill("dinakaran@company.sandbox");
    await page.locator("input.input.password").fill("Testing83$");
    await page.locator("input.button#Login").click();
    await page.waitForTimeout(10000);

    const title = await page.title();
    console.log(`get the title: ${title}`);

    const  url = page.url();
    console.log(`get the current URL: ${url}`);
        
    await page.close();
    await browserContext.close();
    await browser.close();
})

