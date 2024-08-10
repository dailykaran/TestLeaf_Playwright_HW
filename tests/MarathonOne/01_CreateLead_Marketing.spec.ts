import {chromium, expect, test} from "@playwright/test"


test("Create a lead marketing user", async() => {


    const browser = await chromium.launch({headless: false, channel: "chrome"});
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();


    await page.goto("https://login.salesforce.com");
    await expect(page).toHaveURL(/.*salesforce/);
    await expect(page).toHaveTitle(/.*Login | salesforce/);


    await page.getByLabel("UserName").fill('vidyar@testleaf.com');
    const password = page.getByLabel('Password');
    await password.fill('Sales@123');


    await page.locator('#Login').click();
    await expect(page).toHaveURL(/.*SetupOneHome/)
   
    await page.locator('one-app-launcher-header button div.slds-icon-waffle').click();
    await page.locator('one-app-launcher-menu').getByText('View All', {exact: true}).click();


    await page.locator('one-app-launcher-search-bar div[type="search"]').getByLabel('Search apps or items...').fill('Marketing');
    await page.waitForSelector('one-app-launcher-app-tile');


    await page.locator('div lightning-formatted-rich-text span p').click();
    await expect(page).toHaveURL(/.*home/)
   
    await page.locator('one-app-nav-bar-item-root a[href*="Lead/home"]').click();
    await page.waitForLoadState('domcontentloaded');
   
    await page.locator('ul.branding-actions.forceActionsContainer li a[title="New"]').click();
    await expect((await page.locator('records-lwc-detail-panel div h2').innerText()).toString()).toMatch('New Lead');
    console.log(await page.locator('records-lwc-detail-panel div h2').innerText());
   


    await page.getByPlaceholder('First Name').fill('Testuser');
    await page.getByLabel('Last Name').fill('34');
   
    await page.locator('records-record-layout-base-input lightning-primitive-input-simple input[name="Company"]').fill('TestCloud');






    await page.locator('button[name="salutation"]').click();
    await page.locator('span[title="Mr."]').click();


    await page.locator('button[aria-label="Lead Status"]').click();
    await page.locator('span[title="Working - Contacted"]').click();
   
    await page.locator('button[name="SaveEdit"]').click();
    console.log("The toast message displayed " + await page.locator('span.toastMessage.forceActionsText').innerText());


    await page.waitForSelector('span.toastMessage.forceActionsText', { state: "detached" });
    await page.waitForTimeout(3000);


    //await page.locator('table span a[href*="view"][title="Testuser 34"]').click();
    await expect(page).toHaveURL(/.*view/);


    await page.locator('ul[role="presentation"] li.overflow button').click();
    await page.locator('slot [title="Convert"]').click();


    await page.locator('.createPanelCollapsed button[title="TestCloud-"]').click();
    await page.locator('.createPanelExpanded input').last().clear();


    await page.locator('.createPanelExpanded input').last().fill('TestCloud-Testuser34');


    await page.locator('.modal-footer button').last().click();


    expect((await page.locator('div.panel .title h2').innerText()).toString()).toMatch('Your lead has been converted');
    console.log(await page.locator('div.panel .title h2').innerText());
   
    await page.locator('.modal-footer button').last().click();
    await expect(page).toHaveURL(/.*Lead/);


    await page.getByPlaceholder("Search this list...").fill("Testuser34");


    await page.keyboard.down('Enter');
    await page.keyboard.up('Enter');
    await page.waitForTimeout(1000);


    await page.waitForSelector('div[role="status"] lightning-formatted-rich-text span', {state: "attached", timeout: 4000});
    console.log((await page.locator('div[role="status"] lightning-formatted-rich-text span').nth(0).innerText()).toString());
   


    await page.locator('one-app-nav-bar-item-root a[href*="Opportunity"]').click();


    await page.getByPlaceholder("Search this list...").fill("TestCloud-Testuser34");
    await page.keyboard.down('Enter');
    await page.keyboard.up('Enter');


    expect(await page.locator('table tr th a[title="TestCloud-Testuser34"]').first()).toBeVisible();
    await page.locator('table tr th a[title="TestCloud-Testuser34"]').first().click();


    await expect(page.locator('slot lightning-formatted-text[slot="primaryField"]')).toBeVisible();
    await expect((await page.locator('slot lightning-formatted-text[slot="primaryField"]').innerText()).toString()).toMatch('TestCloud-Testuser34');
    console.log((await page.locator('slot lightning-formatted-text[slot="primaryField"]').innerText()).toString());
   
})
