import { test, expect } from "@playwright/test";

test('Window handling under TestLeaf website', async({page, context}) => {

    await page.goto("http://leaftaps.com/opentaps/control/main");

    await page.getByLabel("UserName").fill('demosalesmanager');
    const password = page.getByLabel("Password");
    await password.fill("crmsfa");

    await page.click('.decorativeSubmit');    
    await page.locator("text=CRM/SFA").click();
     
    //Click Leads
    await page.getByRole("link", {name:'Leads'}).click();

    //Click Merge Leads 
    await page.getByRole('link', {name: 'Merge Leads'}).click();

    //Handle a page event in the funtion
    const pageEvent = async(invokeWindow: any)=>{
        const [windowNew_UserList] = await Promise.all([
            context.waitForEvent("page"),
            await invokeWindow.click()
        ])
        return windowNew_UserList
    }
    //Click From Lead widget 
    const returnPageEvent1 = await pageEvent(page.locator('a[href*="ComboBox_partyIdFrom"]'))
    await returnPageEvent1.waitForLoadState();
    await expect(returnPageEvent1).toHaveURL(/.*LookupLeads/);
    //Select the first resulting lead id
    await returnPageEvent1.locator('div[class*="row-alt"]').nth(0).locator('div a.linktext').nth(0).click();

    await page.waitForLoadState();
    await expect(page).toHaveURL(/.*mergeLeadsForm/);

    //Click To Lead widget 
    const returnPageEvent2 = await pageEvent(page.locator('input#partyIdTo+a'));
    await returnPageEvent2.waitForLoadState();
    await expect(returnPageEvent2).toHaveURL(/.*LookupLeads/);
    //Select the second resulting lead id
    await returnPageEvent2.locator('div[class*="row-alt"]').nth(2).locator('div a.linktext').nth(2).click();

    //handle a confirm dialog 
    page.once("dialog", async mergeConfirmDialog => {
        //Get the message
        const message = mergeConfirmDialog.message();
        console.log(`The message says ${message}`);
        //Get the type of alert 
        const type = mergeConfirmDialog.type()
        console.log(`The type of alert ${type}`);
        await mergeConfirmDialog.accept();
    })
    //Click Merge button 
    await page.locator('a.buttonDangerous').click();
    await expect(page).toHaveURL(/.*viewLead/);
    //Assert the title of the page 
    await expect(page).toHaveTitle('View Lead | opentaps CRM');
    console.log('Title: ' + (await page.title()).toString());
    console.log('URL: ' + await page.url());
    
    
})