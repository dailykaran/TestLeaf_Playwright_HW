import { test } from "@playwright/test";


test('Create a lead under TestLeaf website', async({page}) => {


    await page.goto("http://leaftaps.com/opentaps/control/main");

    await page.getByLabel("UserName").fill('demosalesmanager');
    const password = page.getByLabel("Password"); // reuse the password
    await password.fill("crmsfa");
    await page.click('.decorativeSubmit');    
    await page.locator("text=CRM/SFA").click();
     
    //Click Leads
    await page.getByRole("link", {name:'Leads'}).click();

    //Click Create Lead
    await page.locator('//a[text()="Create Lead"]').click();
    //await page.getByRole("link", {name: "Create Lead"}).click();

    await page.locator('input#createLeadForm_companyName').fill("TestNetWorks");
    await page.locator('input#createLeadForm_firstName').fill("TestUser");
    await page.locator('input#createLeadForm_lastName').fill("34");
    await page.locator('input#createLeadForm_firstNameLocal').fill("TestUserLocal");
    await page.locator('input#createLeadForm_lastNameLocal').fill("34Local");
    await page.locator('input#createLeadForm_personalTitle').fill("Mr");
    await page.locator('input#createLeadForm_lastNameLocal').fill("34");
    await page.locator('input#createLeadForm_generalProfTitle').fill("TestScenarios");
    await page.locator('input#createLeadForm_annualRevenue').fill("3400000");
    await page.fill('input#createLeadForm_departmentName', "Hardware_Network");
    await page.fill('input#createLeadForm_primaryPhoneNumber', "044-45342323");
    await page.locator('input.smallSubmit').click();

    await page.waitForSelector('form#viewLead');
    let getAllText= await page.$$('.fieldgroup table tr td span.tabletext');

    /* for await ( const text of getAllText) {
        console.log("trail from foreach: Create-Lead fileds are displayed here - " + await text.innerText());
    } */

    await Promise.all(getAllText.map(async(items) => {
        let getText = await items.textContent();
        if(getText?.trim() !== ""){
            console.log("Create-Lead fileds are displayed here - " + getText);
        }
    }))
   
})


