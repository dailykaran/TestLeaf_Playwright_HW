import {test, expect} from "@playwright/test"

test.describe.configure({ mode: 'serial' });

    let accessToken:any;
    let instUrl:any;
    let id:any;
    let LastName: any;

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



    test("Create a new Lead", async({request})=>{
        const leadURL = `${instUrl}/services/data/v61.0/sobjects/Lead`;
        const lead = await request.post(leadURL, {
            headers:{
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            data:{
                "Salutation": "Mr",
                "LastName": "52TestUser",
                "Company": "TestCloud52"
            }
        })


        const lead_response = await lead.json();
        console.log(lead_response);

        id = await lead_response.id;
        console.log(id);
        expect(lead.ok()).toBeTruthy();
        expect(lead.status()).toBe(201);
   
    })

    test("Lead updated by patch", async({request})=>{
        const leadURL = `${instUrl}/services/data/v61.0/sobjects/Lead/${id}`;
        const lead = await request.patch(leadURL, 
            {
            headers:{
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            data:{
                "Title": "TestCloud"
            }
        })

        /* const responseBody =  await lead.text();
        console.log(responseBody); */
        expect(lead.status()).toBe(204);
        console.log(lead.statusText());
        
    })

    test("get the Lead record", async({request})=>{
        const leadURL = `${instUrl}/services/data/v61.0/sobjects/Lead/${id}`;
        const lead = await request.get(leadURL, {
            headers:{
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        })


        const lead_response = await lead.json();
        //console.log(lead_response);

        const resp_status = lead.status();
        expect(resp_status, "expecting api status code to be 200").toBe(200);
        await expect(lead.ok()).toBeTruthy();
        LastName = await lead_response.LastName;
        console.log(LastName); 
        expect(lead_response).toHaveProperty("LastName", LastName);
       
    })


    test("Delete the Lead", async({page}) => {
    
        await page.goto("https://login.salesforce.com");
        await expect(page).toHaveURL(/.*salesforce/);
        await expect(page).toHaveTitle(/.*Login | salesforce/);
    
    
        await page.getByLabel("UserName").fill('dinakaran@company.sandbox');
        const password = page.getByLabel('Password');
        await password.fill('Testing83$');
    
    
        await page.locator('#Login').click();
        await expect(page).toHaveURL(/.*SetupOneHome/)
       
        await page.locator('one-app-launcher-header button div.slds-icon-waffle').click();
        await page.locator('one-app-launcher-menu').getByText('View All', {exact: true}).click();
    
    
        await page.locator('one-app-launcher-search-bar div[type="search"]').getByLabel('Search apps or items...').fill('Leads');
        await page.waitForSelector('one-app-launcher-tab-item');
    
        await page.locator('one-app-launcher-tab-item a[href*="Lead"] p').click();      
        await page.waitForLoadState('domcontentloaded');

        await page.locator('button[title="Lead owner filter"]').click();
        await page.locator('lightning-base-combobox div[part="input-container"] input').fill(LastName);
        await page.keyboard.press('Enter');
        await page.waitForLoadState('domcontentloaded');

        const saleLeadName = LastName
        await page.locator(`a[title="${saleLeadName}"]`).nth(0).click();
        await page.waitForLoadState("load");
        await page.waitForTimeout(1000);
        await page.reload();

        const saleforce = await page.locator('slot lightning-formatted-name').innerText();
        expect(saleforce).toContain(LastName);

        await page.locator('lightning-button-menu button[part="button button-icon"]').nth(0).click();
        await page.locator('runtime_platform_actions-action-renderer[title="Delete"]').click();
        
        await page.waitForSelector('.modal-header');
        await page.locator('.modal-footer button[title="Delete"]').click();
        await page.waitForLoadState('domcontentloaded');

        const toastMSG = await page.locator('span.toastMessage.forceActionsText').innerText()
        console.log("The toast message displayed " + toastMSG);

        await page.waitForSelector('span.toastMessage.forceActionsText', { state: "detached" });
        await page.waitForTimeout(1000);

        await page.locator('button[title="Lead owner filter"]').click();
        await page.locator('lightning-base-combobox div[part="input-container"] input').fill(LastName);
        await page.keyboard.press('Enter');
        await page.waitForLoadState('domcontentloaded');

        expect(page.locator(`a[title="${saleLeadName}"]`).nth(0)).not.toBeVisible();
        




    })
