import {chromium, expect, test} from "@playwright/test"


test("Basic checkbox, Notification, choose favorite languages", async({page}) => {


/*     const browser = await chromium.launch({headless: false, channel: "chrome"});
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage(); */


    await page.goto("https://leafground.com/checkbox.xhtml");
    await expect(page).toHaveURL(/.*checkbox/);
   
    //Click on the "Basic Checkbox.”
    await page.locator('div.ui-selectbooleancheckbox').filter({hasText: 'Basic'}).click(); // It is not a checkbox action. It is click action.


    // Click on the "Notification Checkbox."
    await page.locator('div.ui-selectbooleancheckbox').filter({hasText: 'Ajax'}).click(); //
   
    //Verify that the expected message is displayed.
    const AlertNotification = await page.locator('div[role="alert"] div > span').innerText();
    expect(AlertNotification).toMatch('Checked');
    console.log(AlertNotification);
   
    //Click on your favorite language (assuming it's related to checkboxes).
    //await page.locator('.card table div.ui-chkbox').nth(2).dispatchEvent("click");
    //await page.locator('.card table input[type=checkbox]').first().dispatchEvent("click"); // It is working but It is trail and error.


    await page.waitForSelector('div[role="alert"] div > span', { state: "detached" } );


    // Check the programming language
    const hiddenElm = await page.$$('.card table td');
    await Promise.all(hiddenElm.map(async(items) => {
        let getText = await items.textContent();
        if(getText?.trim() === "Javascript"){
            console.log("Selected the program language here - " + getText);
            await items.click();
        }
    }))


})




test('TriState Checkbox', async({page}) => {
    await page.goto("https://leafground.com/checkbox.xhtml");
 
    await page.locator('.card').filter({hasText: 'Tri State Checkbox'}).locator('.ui-state-default').click({force: true});
    const getAlertMessage1 = await page.locator('div[role="alert"] div.ui-growl-message p').innerText();
    expect(getAlertMessage1).toContain('1');
    console.log(getAlertMessage1.replace(/(.*)=/,""));


    await page.waitForSelector('div[role="alert"] div.ui-growl-message', { state: "detached" });
    await page.locator('.card').filter({hasText: 'Tri State Checkbox'}).locator('.ui-state-default').click({force: true});
    const getAlertMessage2 = await page.locator('div[role="alert"] div.ui-growl-message p').innerText();
    expect(getAlertMessage2).toContainEqual('2');
    console.log(getAlertMessage2.replace(/(.*)=/,""));
   


    await page.waitForSelector('div[role="alert"] div.ui-growl-message', { state: "detached" });
    await page.locator('.card').filter({hasText: 'Tri State Checkbox'}).locator('.ui-state-default').click({force: true});
    const getAlertMessage0 = await page.locator('div[role="alert"] div.ui-growl-message p').innerText();
    expect(getAlertMessage0).toContainEqual('0');
    console.log(getAlertMessage0.replace(/(.*)=/,""));
   
})


test('Toggle button', async({page}) => {
    await page.goto("https://leafground.com/checkbox.xhtml");


    await page.locator('.card .ui-toggleswitch').click();
    //Verify that the expected message is displayed.
    const alertNotificationChecked = await page.locator('div[role="alert"] div > span').innerText();
    expect(alertNotificationChecked).toMatch('Checked');
    console.log(alertNotificationChecked);


    await page.waitForSelector('div[role="alert"] div > span', { state: "detached" } );


    await page.locator('.card .ui-toggleswitch.ui-toggleswitch-checked').click();
    //Verify that the expected message is displayed.
    const alertNotificationUnchecked = await page.locator('div[role="alert"] div > span').innerText();
    expect(alertNotificationUnchecked).toMatch('Unchecked');
    console.log(alertNotificationUnchecked);
})


test('Checkbox is disabled', async({page}) => {
    await page.goto("https://leafground.com/checkbox.xhtml");


    const getDisabledCheckbox = page.locator('.card .ui-selectbooleancheckbox input[disabled="disabled"]')
    await expect(getDisabledCheckbox).toBeDisabled();
})


test('Select Multiple', async({page}) => {
    await page.goto("https://leafground.com/checkbox.xhtml");


    await page.locator('.ui-selectcheckboxmenu-multiple').click();
    await page.locator('div.ui-selectcheckboxmenu-panel').isVisible();
    await page.locator('input.ui-inputfield.ui-inputtext').fill("B ");


    await page.waitForSelector('ul.ui-selectcheckboxmenu-items', {state: 'attached'});
    await page.waitForTimeout(3000);
    const getListItem = await page.$$('ul.ui-selectcheckboxmenu-items li div.ui-chkbox')
    for await (const oneItem of getListItem) {
        await oneItem.click();
    }
   
    await page.locator('input.ui-inputfield.ui-inputtext').clear();
    await page.locator('a.ui-selectcheckboxmenu-close').click();
})
