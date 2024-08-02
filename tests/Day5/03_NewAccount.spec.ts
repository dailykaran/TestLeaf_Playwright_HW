import {chromium, test} from "@playwright/test";

test('Create a new account for salesforce', async({page}) => {

    await page.goto("https://login.salesforce.com/");
    await page.locator("#username_container input.input.username").fill("dinakaran@company.sandbox");
    await page.locator("input.input.password").fill("Testing83$");
    await page.locator("input.button#Login").click();
    await page.waitForLoadState();


    await page.locator('one-app-launcher-header button div.slds-icon-waffle').click();
    await page.locator('one-app-launcher-menu').getByText('View All', {exact: true}).click();


    await page.locator('one-app-launcher-search-bar div[type="search"]').getByLabel('Search apps or items...').fill('Service');


    await page.waitForSelector('one-app-launcher-app-tile');
    await page.locator('xpath=//one-app-launcher-app-tile//div//a[@class="slds-text-heading_small"]//span').first().click()
   
    await page.locator('one-app-nav-bar-item-root a[href*="Account"]').click();
    await page.waitForLoadState();
    await page.locator('ul.branding-actions.forceActionsContainer li a[title="New"]').click(); //.getByRole('link')
    await page.locator('div input[name="Name"]').fill("Testuser9");
    await page.locator('xpath=//lightning-button //button[@name="SaveEdit"]').click();
    console.log("The toast message displayed " + await page.locator('span.toastMessage.forceActionsText').innerText());        

})
