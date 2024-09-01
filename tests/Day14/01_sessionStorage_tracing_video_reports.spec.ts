import { test, expect, chromium, firefox} from "@playwright/test";
import fs from 'fs';
import path from 'path';


test.describe('Session storage login, video, reports and ', () => {


    test.beforeEach('before each title', async ({page}) => {
        if (fs.existsSync(path.join(__dirname, '../../creds/sales_login_storage.json'))) {
           
            const getSizeOfJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../../creds/sales_login_storage.json'), 'utf-8'));
            const size: any = JSON.stringify(getSizeOfJson);
            console.log("size: " + size.length);
            if(size.length === 22){
            await page.goto("https://login.salesforce.com/");
            await page.fill('#username', 'dinakaran@company.sandbox');
            await page.fill('#password', 'Testing83$');
            await page.click("#Login");
            //Get the login details (cookies)
            await page.context().storageState({path:"creds/sales_login_storage.json"});
            }
            else{
                console.log('Session storage already created and have content more than 22 length');
            }
        }else{
            console.log('sessionstorage json file does not avaliable');            
        }
    })      


    //test.use({storageState: "creds/sales_login_storage.json"})
    test.use({
        storageState: async ({}, use) => {
            if (fs.existsSync(path.join(__dirname, '../../creds/sales_login_storage.json'))) {
                console.log("Sessionstorge file already generated under creds folder. So, use that file");
                await use('./creds/sales_login_storage.json');
            }
            else{
                const obj: any = {
                    table: []
                };
                obj.table.push({"id": "1"});
                var json = JSON.stringify(obj);
                const storageState1: any = fs.writeFile('./creds/sales_login_storage.json', json, 'utf8', function(err) {
                    if (err) throw err;
                    console.log('getting an error after creating a file: ' + err);
                });
                await use(storageState1)
            }
        }        
    })


    test('Login to SaleForce using sessionstorge: Marketing page', async ({page}) => {
        await page.goto('https://ecgroupinternational-dev-ed.develop.lightning.force.com', { waitUntil: 'networkidle' });
        await expect(page).toHaveURL(/.*home/);
       
        await page.locator('one-app-launcher-header button div.slds-icon-waffle').click();
        await page.locator('one-app-launcher-menu').getByText('View All', {exact: true}).click();  
        await page.locator('one-app-launcher-search-bar div[type="search"]').getByLabel('Search apps or items...').fill('Marketing');
        await page.waitForSelector('one-app-launcher-app-tile', {state: 'attached'});
        await page.locator('div lightning-formatted-rich-text span p').click();
        await expect(page).toHaveURL(/.*home/);
        await expect(page.locator('one-appnav h1>span')).toHaveText('Marketing CRM Classic');
    })


    test.only('Login to SaleForce using sessionstorge: Leads page', async () => {
        const dateTimeFormat = new Date().toISOString();


        const browser = await chromium.launch();
        const context = await browser.newContext();
        //Start tracing
        await context.tracing.start({ title: "Leads page have trace file", screenshots: true, snapshots: true });
        const page = await context.newPage();


        await page.goto('https://ecgroupinternational-dev-ed.develop.lightning.force.com', { waitUntil: 'networkidle' });
        await expect(page).toHaveURL(/.*home/);
       
        await page.waitForTimeout(2000)
        await page.locator('one-app-launcher-header button div.slds-icon-waffle').click();
        await page.locator('one-app-launcher-menu').getByText('View All', {exact: true}).click();  
        await page.locator('one-app-launcher-search-bar div[type="search"]').getByLabel('Search apps or items...').fill('Leads');
        await page.waitForSelector('one-app-launcher-tab-item');
        await page.locator('one-app-launcher-tab-item a[href*="Lead"] p').click();      
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL(/.*Lead/);
        await expect(page.locator('.slds-page-header__name h1 span').nth(0)).toHaveText('Leads');
       
        const getTraceFolderPath = `Trace/trace_${dateTimeFormat}.zip`
        //console.log(getTraceFolderPath.toString());
        //Stop tracing
        await context.tracing.stop({ path: 'traceLeads.zip' });
        await browser.close();
    })
   
    test('Login to SaleForce using sessionstorge: Dashboard page', async () => {
        const dateFormat = new Date().toISOString().slice(0, 10).split('-').reverse().join('_');
       
        const browser = await chromium.launch();
        const context = await browser.newContext({
            recordVideo:{
                dir: `videos/${dateFormat}`,
                size: { width: 1280, height: 720 }
            }
        });
        const page = await context.newPage();
        await page.goto('https://ecgroupinternational-dev-ed.develop.lightning.force.com', { waitUntil: 'networkidle' });
        await expect(page).toHaveURL(/.*home/);


        await page.locator('one-app-launcher-header button div.slds-icon-waffle').click();
        await expect(page.locator('.container one-app-launcher-menu')).toBeVisible();
        await page.locator('one-app-launcher-menu').getByText('View All', {exact: true}).click();
        await page.locator('one-app-launcher-search-bar div[type="search"]').getByLabel('Search apps or items...').fill('Dashboards');
        await page.waitForSelector('one-app-launcher-tab-item');
        await expect(page.locator('one-app-launcher-tab-item ').getByRole('link')).toHaveCount(1);
        await page.locator('one-app-launcher-tab-item a[href*="Dashboard"] p').click();      
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL(/.*Dashboard/)
        await expect(page.locator('#navSection h2#entity-header').nth(0)).toHaveText('Dashboards');
        await browser.close();
    })


})
