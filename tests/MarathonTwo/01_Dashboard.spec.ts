import {test, expect} from "@playwright/test"

test.describe.configure({ mode: 'serial' });
    test("Create a Dashboard", async({page}) => {
    //Login to Salesforce
        await page.goto("https://login.salesforce.com");
        await expect(page).toHaveURL(/.*salesforce/);
        await expect(page).toHaveTitle(/.*Login | salesforce/);
        await page.getByLabel("UserName").fill('dinakaran@company.sandbox');
        const password = page.getByLabel('Password');
        await password.fill('Testing83$');
        await page.locator('#Login').click();
        //Expected
        await expect(page).toHaveURL(/.*SetupOneHome/)
   
        //Access the Toggle Menu
        await page.locator('one-app-launcher-header button div.slds-icon-waffle').click();
        //expected
        await expect(page.locator('.container one-app-launcher-menu')).toBeVisible();
        //Navigate to Dashboards
        await page.locator('one-app-launcher-menu').getByText('View All', {exact: true}).click();
        await page.locator('one-app-launcher-search-bar div[type="search"]').getByLabel('Search apps or items...').fill('Dashboards');
        await page.waitForSelector('one-app-launcher-tab-item');
        //expected
        await expect(page.locator('one-app-launcher-tab-item ').getByRole('link')).toHaveCount(1);
        await page.locator('one-app-launcher-tab-item a[href*="Dashboard"] p').click();      
        await page.waitForLoadState('domcontentloaded');
        await expect(page).toHaveURL(/.*Dashboard/)


        await page.locator('a[title="New Dashboard"]').click();
        await page.waitForLoadState('domcontentloaded');


        const iframe = await page.frameLocator('iframe[title="dashboard"]').last();
        //expected
        await expect(iframe.locator('Header h1')).toHaveText('New Dashboard');
       
        await iframe.locator('#dashboardNameInput').fill('Salesforce Automation by TestCloud');
        await iframe.locator('#dashboardDescriptionInput').fill('Testing World');
        await iframe.locator('#submitBtn').click();
        await page.waitForLoadState('domcontentloaded');


        //expected
        expect(await iframe.locator('.dashboard-properties div.editTitle span').nth(0).innerText()).toContain('TestCloud');
        await expect(iframe.locator('.toolbarActions .actions >[role="group"] > button')).toBeVisible();
        await page.waitForTimeout(1000);
        await iframe.locator('.dashboard-properties div.editTitle span').nth(0).click();
        //await page.waitForSelector('input#edit-dashboard-title')
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(1000);
        await iframe.locator('input#edit-dashboard-title').fill('Rename TestCloud');
        await page.waitForTimeout(1000);
        await iframe.locator('.toolbarActions .actions >[role="group"] > button').click();
        //expected
        const toastMSG = await page.locator('span.toastMessage.forceActionsText').innerText();
        console.log("The toast message displayed: " + toastMSG);
        await expect(toastMSG).toContain("Dashboard");




    })


    let accessToken:any;
    let instUrl:any;
    let getID:any;


    test('Generate the access token Salesforce', async({request}) => {
        const url = "https://login.salesforce.com/services/oauth2/token"
        const clientID = "3MVG9WVXk15qiz1J6CJCjggObyuHAjc_kV9.Ep5bdrXNTWxNZwA3u8pOIOhdtGRIcL9_nIhFbedSCkXzq2elS"
        const clientSecret = "C1AD2B3466BB86766A01759A9E8F43686F379E4081E6E068E36A7C69FB8A947D"
        const username = "dinakaran@company.sandbox"
        const password = "Testing83$"
        const grantType = "password"


        const generatingToken = await request.post(url, {
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
                "Connection": "keep-alive"
            },
            form:{
                "grant_type":grantType,
                "client_id":clientID,
                "client_secret":clientSecret,
                "username":username,
                "password":password
            }
        })


        const generatingTokenJson = await generatingToken.json();
        console.log(generatingToken);


        accessToken = await generatingTokenJson.access_token;
        console.log(accessToken);


        instUrl = await generatingTokenJson.instance_url;
        console.log(instUrl);  


        const apiStatusCode = generatingToken.status();
        console.log("Post the status code: "+ apiStatusCode);
        expect(apiStatusCode, "expecting api status code to be 200").toBe(200);  
    })
    //Steps to get the created dashboard list
    test("Get all dashboard list and find the dashboard needs to delete", async({request})=>{
        const dashboardURL = `${instUrl}/services/data/v61.0/sobjects/Dashboard`;
        const dashboard = await request.get(dashboardURL, {
            headers:{
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        })


        const dashboard_response = await dashboard.json();
        console.log(dashboard_response);


        const resp_status = dashboard.status();
        expect(resp_status, "expecting api status code to be 200").toBe(200);
        await expect(dashboard.ok()).toBeTruthy();


        const getListID = dashboard_response.recentItems
        for (const listID of getListID) {
            const titleName = listID.Title.toString();
            if(titleName.includes('Rename')){
                getID = listID.Id
                console.log(` This ${getID.toString()} rename is deleted`);
            }
        };
       
    })
    //Steps to delete the created dashboard
    test("Dashboard removed by Delete ", async({request})=>{
        const DashboardURL = `${instUrl}/services/data/v61.0/sobjects/Dashboard/${getID}`;
        const deleteDashboard = await request.delete(DashboardURL, {
            headers:{
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        })
        console.log(deleteDashboard.status());
        expect(deleteDashboard.status()).toBe(204);
        expect(deleteDashboard.statusText()).toBe('No Content');
    })






