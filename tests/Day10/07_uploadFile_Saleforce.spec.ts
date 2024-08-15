import {expect, test} from "@playwright/test";
import path from "path";

test('Create a new account for salesforce and upload a file', async({page}) => {

    await page.goto("https://login.salesforce.com/");
    await page.locator("#username_container input.input.username").fill("dinakaran@company.sandbox");
    await page.locator("input.input.password").fill("Testing83$");
    await page.locator("input.button#Login").click();
    await page.waitForLoadState();

    await page.locator('one-app-launcher-header button div.slds-icon-waffle').click();
    //Click View All
    await page.locator('one-app-launcher-menu').getByText('View All', {exact: true}).click();
    //Enter Accounts in App Launcher search box
    await page.locator('one-app-launcher-search-bar div[type="search"]').getByLabel('Search apps or items...').fill('Accounts');

    await page.waitForLoadState();
    //Click Accounts 
    await page.locator('one-app-launcher-tab-item a[href*="Account"]').click();
   
    await page.locator('one-app-nav-bar-item-root a[href*="Account"]').click();
    await page.waitForLoadState();
    //Click New 
    await page.locator('ul.branding-actions.forceActionsContainer li a[title="New"]').first().click(); 
    //Enter Account Name
    await page.locator('div input[name="Name"]').fill("Testuser43");

    //Select Warm from the Rating dropdown 
    await page.locator('lightning-combobox>div').filter({hasText: "Rating"}).locator('lightning-base-combobox button').click();
    await page.locator('lightning-base-combobox-item span[title="Warm"]').click();
    //Select Prospect from the Type dropdown 
    await page.locator('lightning-combobox>div').filter({hasText: "Type"}).locator('lightning-base-combobox button').click();
    await page.locator('lightning-base-combobox-item span[title="Prospect"]').click();
    //Select Banking from the Industry dropdown 
    await page.locator('lightning-combobox>div').filter({hasText: "Industry"}).locator('lightning-base-combobox button').click();
    await page.locator('lightning-base-combobox-item span[title="Banking"]').click();
    //Select Public from the Ownership dropdown 
    await page.locator('lightning-combobox>div').filter({hasText: "Ownership"}).locator('lightning-base-combobox button').click();
    await page.locator('lightning-base-combobox-item span[title="Public"]').click();
    //Click Save
    await page.locator('xpath=//lightning-button //button[@name="SaveEdit"]').click();
    const accountToastMessage = await page.locator('span.toastMessage.forceActionsText').innerText();
    console.log("The toast message displayed " + accountToastMessage);
    //Assert the Account created 
    expect(accountToastMessage).toContain('Testuser43');
    await page.waitForSelector('span.toastMessage', {state: 'detached'});

    //Upload files 
    await page.locator('lightning-primitive-file-droppable-zone label>span').filter({hasText: 'Upload Files'}).setInputFiles([path.join(__dirname, "InputTextTesting.txt")]);

    await page.waitForSelector('lightning-icon[icon-name="utility:success"]');
    //Click Done
    await page.locator('.modal-footer button').click();
    console.log("The toast message displayed " + await page.locator('span.toastMessage.forceActionsText').innerText());
    
    //assert the uploaded file 
    const uploadedFileName = await page.locator('.filerow span.itemTitle' ).innerText();
    console.log(uploadedFileName);
    expect(uploadedFileName).toContain('InputTextTesting');
    await expect(page.locator('span[title="InputTextTesting"]')).toHaveClass(['itemTitle slds-text-body--regulardesktop uiOutputText']);

    
})