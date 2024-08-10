

import { test, expect, Locator, Page} from "@playwright/test"

test("Leafground Button actions", async({page})=>{

    await page.goto('https://leafground.com/button.xhtml');
    await page.locator('.card').filter({hasText: 'Click and Confirm title.'}).locator('button').click();
        
    await expect(page).toHaveTitle(/.*Dashboard/);
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page).not.toHaveURL(/.*button/);
    await page.goBack();
    
    //await page.locator('button[disabled]').highlight();

    // assert the disabled button
    let btnDisabled = page.locator('button[disabled]');
    btnDisabled.highlight();    
    await expect(btnDisabled).toBeDisabled();

    //img button
    const imgBtn = page.locator('.card ').filter({hasText: "Click Image Button and Click on any hidden button"});
    await imgBtn.locator('button').click();
    //await btnToClick1.click();

    await expect(page.locator('.ui-connected-overlay-enter-done > div img')).toBeVisible();
    await expect(page.locator('div.grid input[type=hidden]').last()).toBeHidden();
    await expect(page.locator('div.grid input[type=hidden]').nth(0)).not.toBeVisible();
    
    //await page.locator('div.grid input[type=hidden]').nth(1).click({force: true}); // It is hidden element

    const groupbtn = page.locator('.card').filter({hasText: 'How many rounded buttons are there?'}).locator('button');
    expect(await groupbtn.count()).toEqual(4);

    const colorChangeBtn = page.locator('.card').filter({hasText: 'Mouse over and confirm the color changed'}).locator('button');
    await colorChangeBtn.hover();
    await expect(colorChangeBtn.locator('span')).toHaveCSS('background-color', 'rgb(250, 128, 114)'); // salmon RGB color;


})