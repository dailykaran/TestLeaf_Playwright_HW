import { test, expect } from "@playwright/test";


test("Edit the lead details on the updateLeadForm page", async({page}) => {

    await page.goto("http://leaftaps.com/opentaps/control/main");
    await page.getByLabel("UserName").fill('demosalesmanager');
    const password = page.getByLabel("Password"); // reuse the password
    await password.fill("crmsfa");
    await page.click('.decorativeSubmit');    
    await page.locator("text=CRM/SFA").click();
     
    //Click Leads
    await page.getByRole("link", {name:'Leads'}).click();
    await page.getByRole("link", {name: 'Find Leads'}).click();
    await page.locator('#findLeads input.x-form-text.x-form-field[name="firstName"]').fill('Testuser');

    await page.getByRole('button', {name: 'Find Leads'}).click();
    await page.locator('div.x-grid3-scroller table tbody tr td div a.linktext').first().click();
    await page.locator('div.frameSectionExtra a[href^="updateLeadForm"]').click();
    await page.waitForLoadState();

    //update the text boxes.
    let companyName = "TelecomNetWorks";
    let annualRevenue = "9,400,000";
    let department = "Telecom_Network";
    let description = "Three fields are updated";

    await page.locator('input#updateLeadForm_companyName').fill(companyName);
    await page.locator('input#updateLeadForm_annualRevenue').fill(annualRevenue);
    await page.locator('input#updateLeadForm_departmentName').fill(department);
    await page.locator('textarea#updateLeadForm_description').fill(description);
    await page.locator('form#updateLeadForm input.smallSubmit').click();


    await page.waitForLoadState();
    const updatecompanyName = await page.locator('.fieldgroup table tr td span.tabletext').filter({hasText: companyName}).innerText();
    await expect(updatecompanyName).toMatch(companyName);

    const updateannualRevenue = await page.locator('.fieldgroup table tr td span.tabletext').filter({hasText: annualRevenue}).innerText();
    await expect(updateannualRevenue).toMatch(annualRevenue);

    const upadteDepartment = await page.locator('.fieldgroup table tr td span.tabletext').filter({hasText: department}).innerText();
    await expect(upadteDepartment).toMatch(department);

    const updateDescription = await page.locator('.fieldgroup table tr td span.tabletext').filter({hasText: description}).innerText();
    await expect(updateDescription).toMatch(description);

    console.log("It is a page of 'View_lead': " + await page.title());
})
