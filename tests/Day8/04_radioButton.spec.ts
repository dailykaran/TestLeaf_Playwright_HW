/* 
Assignment Requirements:
1. Navigate to https://leafground.com/radio.xhtml
2. Identify and assert the default selected radio button.
3. Click your most favorite browser and assert that the browser is enabled.
4. Click one of the cities.
5. Select the age group. Assert the default selected button */


import {test, expect } from "@playwright/test"

test('Radio buttons', async ({page})=>{

    //2. Identify and assert the default selected radio button.
    page.goto("https://leafground.com/radio.xhtml");
    
    const getStateOfSafari = await page.locator('.card').filter({hasText: "Find the default select radio button"}).locator('table.ui-selectoneradio')
    .locator('td>label').getByText('Safari').isChecked();
    console.log(`Varify the safari is checked state: ${getStateOfSafari}`);

    'Select the age group (only if not selected)'    

    const getStateOfGroup = await page.locator('.card').filter({hasText: 'Select the age group (only if not selected)'}).locator('div.ui-selectoneradio')
    .locator('div>label').getByText('21-40 Years').isChecked();
    console.log(`Varify the ageGroup is checked state: ${getStateOfGroup}`);

    const multipleChecked = await page.$$('table.ui-selectoneradio input[checked="checked"]')
    for (const aRadio of multipleChecked) {
        expect(aRadio).toBeTruthy();        
    }


    // 3. Click your most favorite browser and assert that the browser is enabled.

    const checkChrome = await page.locator('.card').filter({hasText: "Find the default select radio button"}).locator('table.ui-selectoneradio tr td').all();

    for (const getRadio of checkChrome) {
        let getRadioText = await getRadio.locator('label').innerText();
        if (getRadioText === 'Chrome'){
            getRadio.locator('div.ui-radiobutton-box').click();
            expect(getRadio.locator('input[type="radio"]')).toBeChecked();
        }   
    }

    //4. Click one of the cities.    
    const checkCity = await page.locator('.card').filter({hasText: "UnSelectable"}).locator('div.ui-selectoneradio > div').all();
    for (const getCity of checkCity) {
        let getCityText = await getCity.locator('div > label').getByText("Chennai");
        if (await getCityText.innerText() === 'Chennai'){
            await getCityText.click({force:true});
            expect(getCity.locator('input[type="radio"]')).toBeTruthy();
        }   
    }

    //5. Select the age group. Assert the default selected button

    const getageOfGroup = page.locator('.card').filter({hasText: 'Select the age group (only if not selected)'}).locator('div.ui-selectoneradio')
    const getAgeYear= getageOfGroup.locator('div>label').getByText('1-20 Years');
    await getAgeYear.click({force:true})
    expect(await getAgeYear.isChecked()).toBeTruthy();

})
