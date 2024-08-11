/* 
1. Navigate to https://leafground.com/waits.xhtml
2. Wait for an element to become visible before interacting with it.
3. Wait for an element to disappear from the page.
4. Wait for an element to become clickable.
5. Check for text changes within an element and respond accordingly.
6. Assert the various actions performed on the page.
*/

import {test, expect } from "@playwright/test"

test('Auto waiting', async ({page})=>{
   
    page.goto('https://leafground.com/waits.xhtml');

    // Wait for Visibility
    await page.locator(".card").filter({hasText: "Wait for Visibility"}).getByRole('button').filter({hasText: "Click"}).click();
    await expect(page.locator(".card").filter({hasText: "Wait for Visibility"}).getByRole('button').filter({hasText: "I am here"})).toBeVisible({visible: true});

    // Wait for InVisibility
    const cardToselect1 = page.locator('.card').filter({hasText: "Wait for InVisibility"});
    await cardToselect1.getByRole('button').filter({hasText: "Click"}).click();
    await expect(cardToselect1.getByRole('button').filter({hasText: "I am about to hide"})).toBeHidden();


    // Wait for Text Change
    const cardToselect2 = page.locator('.card').filter({hasText: "Wait for Text Change"});
    await cardToselect2.getByRole('button').filter({hasText: "Click"}).click();
    await expect(cardToselect2.getByRole('button').filter({hasText: "Did you notice?"})).toBeVisible();
})

test("Wait for Clickability", async ({page}) => {
    page.goto('https://leafground.com/waits.xhtml');
    // Wait for Clickability
    await page.locator('.card').filter({hasText: "Wait for Clickability"}).getByRole('button', {name: "Click First Button"}).click({force:true});
    const messageAlert = page.locator('div[role="alert"] div.ui-growl-message span').last();
    
    await page.waitForSelector('div[role="alert"] div.ui-growl-message span' , { state: 'detached' });
    await expect(messageAlert).toBeHidden();
    
})