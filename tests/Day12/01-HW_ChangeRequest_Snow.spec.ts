import {expect, test} from "@playwright/test"

// Annotate entire file as serial.
test.describe.configure({ mode: 'serial' });
    let sysId: any; 
    let instanceId: any;

    // Create a new change_request and get the status code and response body 
    test('Api Post', async({request})=>{

        const response = await request.post("https://dev211073.service-now.com/api/now/table/incident", 
        {
            headers: {
                "Authorization": "Basic YWRtaW46VGVzdGluZ0AxMjM=",
                "Content-Type": "application/json"
            },
            data: {
                short_description: "Created by playwright API"
            }
        })

        const responseBody = await response.json();
        //console.log(responseBody);

        const apiStatusCode = response.status();
        console.log("Post the status code: "+ apiStatusCode);
    
        expect(apiStatusCode, "expecting api status code to be 201").toBe(201);

        sysId = responseBody.result.sys_id;
        console.log("Display the system_id: " + sysId);

        instanceId = responseBody.result.number;
        console.log("Display the instance id: " + instanceId);
        expect(apiStatusCode, "expecting api status code to be 201").toBe(201);  
        expect(response.ok()).toBeTruthy();

    })

    //Retrieve the newly created change request
    test('api Get', async({request})=>{

        const getResponse = await request.get(`https://dev211073.service-now.com/api/now/table/incident/${sysId}`, {

            headers: {
                "Authorization": "Basic YWRtaW46VGVzdGluZ0AxMjM=",
                "Content-Type": "application/json"
            },

        })
        const respBody = await getResponse.json();
        console.log(respBody);
        expect(getResponse.status(), "expecting api status code to be 200").toBe(200);
        await expect(getResponse.ok()).toBeTruthy();
        expect(respBody.result).toHaveProperty('sys_id', sysId);
        expect(respBody.result).toHaveProperty('task_effective_number', instanceId);
        expect(respBody.result).toHaveProperty('short_description', 'Created by playwright API',);

    })

    /*  Modify "short_description" for the newly created change request using put/patch and assert it using the 
playwright library */
    test('api update the patch', async({request})=>{

        const getResponse = await request.patch(`https://dev211073.service-now.com/api/now/table/incident/${sysId}`, {

            headers: {
                "Authorization": "Basic YWRtaW46VGVzdGluZ0AxMjM=",
                "Content-Type": "application/json"
            },
            data: {
                short_description: "Created by playwright API and updated by patch request"
                //subcategory: "email",
            }

        })
        const responseBody =  JSON.parse(await getResponse.text());
        console.log(responseBody);
        expect(getResponse.status()).toBe(200);

        const responseBodyText = await getResponse.text();
        console.log(responseBodyText.includes("short_description"));
        expect(responseBodyText.includes("short_description")).toBeTruthy();
        expect(responseBody.result.short_description).toContain('patch');

    })
        
    test('api update the put', async({request})=>{

        const getResponse = await request.put(`https://dev211073.service-now.com/api/now/table/incident/${sysId}`, {

            headers: {
                "Authorization": "Basic YWRtaW46VGVzdGluZ0AxMjM=",
                "Content-Type": "application/json"
            },
            data: {
                subcategory: "Email",
            }

        })
        const responseBody =  JSON.parse(await getResponse.text());
        console.log(responseBody);
        expect(getResponse.status()).toBe(200);

        const responseBodyText = await getResponse.text();
        console.log(responseBodyText.includes("subcategory"));
        expect(responseBodyText.includes("subcategory")).toBeTruthy();
        expect(responseBody.result.subcategory).toContain('email');

    })

    //Delete the newly created change request using Delete and verify the status code 
    test('api request to delete record', async({request})=>{

        const getResponse = await request.delete(`https://dev211073.service-now.com/api/now/table/incident/${sysId}`, {

            headers: {
                "Authorization": "Basic YWRtaW46VGVzdGluZ0AxMjM=",
                "Content-Type": "application/json"
            },
        })

        console.log(getResponse.status());
        expect(getResponse.status()).toBe(204);
        expect(getResponse.statusText()).toBe('No Content');
})