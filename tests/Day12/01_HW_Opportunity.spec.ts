import {test, expect} from "@playwright/test"


// Annotate entire file as serial.
test.describe.configure({ mode: 'serial' });
    let accessToken:any;
    let instUrl:any;
    let id:any;
    //Generate an access token and set the access token as a global variable
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


    //Create a new opportunity and set the opportunity ID as a global variable
    test("Create a new record under opportunity", async({request})=>{
        const oppURL = `${instUrl}/services/data/v61.0/sobjects/Opportunity`;
        const opportunity = await request.post(oppURL, {
            headers:{
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            data:{
                "CloseDate": "2026-08-25",
                "StageName": "Value Proposition",
                "Name": "It is created by playwright New API",
                "Type": "Existing Customer - Upgrade",
            }
        })


        const opportunity_response = await opportunity.json();
        console.log(opportunity_response);


        id = await opportunity_response.id;
        console.log(id);
        expect(opportunity.ok()).toBeTruthy();
        expect(opportunity.status()).toBe(201);
   
    })


    // Update the type dropdown to ‘New Customer’ and stage dropdown to ‘Prospecting’
    test("opportunity updated by patch", async({request})=>{
        const oppURL = `${instUrl}/services/data/v61.0/sobjects/Opportunity/${id}`;
        const opportunity = await request.patch(oppURL,
            {
            headers:{
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            data:{
                "Type": "New Customer",
                "StageName": "Prospecting",
            }
        })


        //const responseBody =  JSON.parse(await opportunity.text());
        console.log((await opportunity.body()).toString());
        expect(opportunity.status()).toBe(204);
        expect(opportunity.statusText()).toBe('No Content');
        expect(opportunity.url()).toContain("Opportunity");
       
    })


    //Get all the opportunities in your instance
    test("get the opportunity record", async({request})=>{
        const oppURL = `${instUrl}/services/data/v61.0/sobjects/Opportunity/${id}`;
        const opportunity = await request.get(oppURL, {
            headers:{
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        })


        const opportunity_response = await opportunity.json();
        console.log(opportunity_response);


        const resp_status = opportunity.status();
        expect(resp_status, "expecting api status code to be 200").toBe(200);
        await expect(opportunity.ok()).toBeTruthy();
        expect(opportunity_response).toHaveProperty("Type", "New Customer");
        expect(opportunity_response).toHaveProperty("StageName", "Prospecting",);
       
    })


    // Delete the first record
    test("opportunity removed by Delete ", async({request})=>{
        const oppURL = `${instUrl}/services/data/v61.0/sobjects/Opportunity/${id}`;
        const deleteopportunity = await request.delete(oppURL, {
            headers:{
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        })
        console.log(deleteopportunity.status());
        expect(deleteopportunity.status()).toBe(204);
        expect(deleteopportunity.statusText()).toBe('No Content');
        //expect(deleteopportunity.status()).toEqual(201);

    })
