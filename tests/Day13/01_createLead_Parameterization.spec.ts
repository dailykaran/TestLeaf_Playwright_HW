import { test } from "@playwright/test";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import dotenv from "dotenv"
dotenv.config();


let environment = process.env.NODE_ENV || 'QA'
//let environment = 'QA'
let evnPath = path.resolve(__dirname, `../../data/${environment}.env`);
dotenv.config({path:evnPath})


const createLead = JSON.parse(fs.readFileSync(path.join(__dirname, '../../parameterization_Data/create_Lead.json'), 'utf-8'));
const leadInfo = parse(fs.readFileSync(path.join(__dirname, '../../parameterization_Data/lead_Contact_Info.csv')),{
    columns: true,
    skip_empty_lines: true
})


test('Create a lead under TestLeaf website', async({page}) => {


    const username = process.env.SFUSERNAME as string;
    const password = process.env.SFPASSWORD as string;


    await page.goto("http://leaftaps.com/opentaps/control/main");
    await page.getByLabel("UserName").fill(username);
    await page.getByLabel("Password").fill(password);
   
    await page.click('.decorativeSubmit');    
    await page.locator("text=CRM/SFA").click();
     
    //Click Leads
    await page.getByRole("link", {name:'Leads'}).click();


    //Click Create Lead
    await page.locator('//a[text()="Create Lead"]').click();
    //await page.getByRole("link", {name: "Create Lead"}).click();


    await page.locator('input#createLeadForm_companyName').fill(createLead.Info.companyName);
    await page.locator('input#createLeadForm_firstName').fill(createLead.Info.firstName);
    await page.locator('input#createLeadForm_lastName').fill(createLead.Info.lastName);
    await page.locator('input#createLeadForm_personalTitle').fill(createLead.Info.salutation);
   
    await page.selectOption('#createLeadForm_dataSourceId', createLead.Info.source);
    await page.selectOption('#createLeadForm_marketingCampaignId', createLead.Info.marketingCampaign);
    await page.selectOption('#createLeadForm_industryEnumId', createLead.Info.industry);
    await page.selectOption('#createLeadForm_currencyUomId', createLead.Info.preferredCurrency);


    await page.selectOption('#createLeadForm_generalCountryGeoId', createLead.PrimaryAddress.country);
    await page.fill('input#createLeadForm_departmentName', createLead.Info.department);
    await page.selectOption('#createLeadForm_generalStateProvinceGeoId', createLead.PrimaryAddress.stateProvince);
   
    //Contact Information
    for (const info of leadInfo) {
    await page.locator('#createLeadForm_primaryPhoneCountryCode').fill(info.CountryCode);
    await page.locator('#createLeadForm_primaryPhoneAreaCode').fill(info.AreaCode);
    await page.locator('#createLeadForm_primaryPhoneExtension').fill(info.Extension);
    await page.locator('#createLeadForm_primaryEmail').fill(info.emailAddress);
    await page.locator('#createLeadForm_primaryPhoneNumber').fill(info.PhoneNumber);
    await page.locator('#createLeadForm_primaryPhoneAskForName').fill(info.PersontoAskFor);
    await page.locator('#createLeadForm_primaryWebUrl').fill(info.webUrl);
    }
    await page.locator('input.smallSubmit').click();


    await page.waitForSelector('form#viewLead');
    let getAllText= await page.$$('.fieldgroup table tr td span.tabletext');


    await Promise.all(getAllText.map(async(items) => {
        let getText = await items.textContent();
        if(getText?.trim() !== ""){
            console.log("Create-Lead fileds are displayed here - " + getText);
        }
    }))
   
})
