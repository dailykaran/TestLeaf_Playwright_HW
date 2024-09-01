import { BrowserContext, chromium, expect, firefox, test, Page } from "@playwright/test";


test.only(`Basic Authentication using persistent context`, async () => {
 
    const userDataDir = "./myUserDataDir";
    const browser:BrowserContext = await firefox.launchPersistentContext(userDataDir, {
        headless:false,
        permissions: ['notifications', 'geolocation'],
        //channel: 'chrome'
    })
    const pages = browser.pages(); // stored array pages
    const page:Page = pages[0]; // If I mentioned in this way and then single broswer window will open.
    //Enter the Username, Password and click on the Login button.
    await page.goto("https://login.salesforce.com/");
    await page.fill('#username', 'dinakaran@company.sandbox');
    await page.fill('#password', 'Testing83$');
    await page.click("#Login");
   
    await expect(page).toHaveURL(/.*home/);
    await page.waitForTimeout(1000);
    await page.locator('one-app-launcher-header button div.slds-icon-waffle').click();
    await expect(page.locator('.container one-app-launcher-menu')).toBeVisible();
    await page.locator('one-app-launcher-menu').getByText('View All', {exact: true}).click();  
    await page.locator('one-app-launcher-search-bar div[type="search"]').getByLabel('Search apps or items...').fill('Automation');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('one-app-launcher-app-tile', {state: 'attached'});
    await page.locator('div lightning-formatted-rich-text span p').click();
    await expect(page).toHaveURL(/.*home/);
    await expect(page.locator('one-appnav h1>span')).toHaveText('Automation');


    await page.close();
})
