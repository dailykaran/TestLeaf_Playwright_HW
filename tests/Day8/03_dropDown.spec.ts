import {test, expect } from "@playwright/test"

test('select a automation tools with various way', async ({page})=>{

    await page.goto('https://leafground.com/select.xhtml');
    await page.locator('select.ui-selectonemenu').click();

    // Select your favorite UI automation tool using the different select options 
    await page.locator('select.ui-selectonemenu').selectOption('Playwright');
    await page.selectOption('select.ui-selectonemenu', 'Cypress');
    await page.locator('select.ui-selectonemenu').selectOption({ label: 'Selenium' });
    
})

test('Select a country', async ({page}) => {

    await page.goto('https://leafground.com/select.xhtml');
    //Get the count and print of all the values
    
    const getNumberOflength = await page.locator('select.ui-selectonemenu option').count();
    console.log('Get the number of tool available in the dropdown: ', getNumberOflength);

    page.keyboard.press('Escape');
    // Choose your preferred Country
    await page.locator('label.ui-selectonemenu-label[id*="country_label"]').click();
    await page.locator('ul.ui-selectonemenu-items li[data-label="India"]').click({force:true});

    await page.locator('.ui-selectonemenu select[name*="city_input"] option').selectOption('Chennai');
    const getListOfCities = await page.locator('.ui-selectonemenu select[name*="city_input"] option').allTextContents();

    //Confirm Cities belongs to Country is loaded
    await expect(getListOfCities.slice(1, 4)).toHaveLength(3);
    console.log(getListOfCities.slice(1, 4));
    // assert the cities
    const allText = (await page.locator('.ui-selectonemenu select[name*="city_input"] option').allInnerTexts()).splice(1, 4);
    await expect(allText.toString()).toContain('Bengaluru,Chennai,Delhi');    
})


test('Choose any three courses ', async({page})=>{

    await page.goto('https://leafground.com/select.xhtml'); 
    const addThreeCourses = ['Playwright', 'AWS', 'React']

    for (const aProgram of addThreeCourses) {
        await page.locator('ul.ui-autocomplete-multiple-container input').fill(aProgram);
        await page.keyboard.press('Enter');    
    }
    //await page.getByPlaceholder('Choose Course').fill('aws');
})

test('Choose a language and print all the values from the dropdown.', async({page})=>{
    await page.goto('https://leafground.com/select.xhtml'); 

    await page.locator('[id*="lang"].ui-selectonemenu').click();
    await page.locator('ul li.ui-selectonemenu-list-item[data-label="Tamil"]').click();
    await page.waitForTimeout(1000);

    //  Select 'Two' irrespective of the language chosen
    await page.locator(('[id*="value"].ui-selectonemenu .ui-selectonemenu-trigger')).click({force: true});
    console.log(await page.locator(('.ui-selectonemenu select[name*="value_input"] option')).allInnerTexts());
    await page.locator('ul li.ui-selectonemenu-list-item[data-label="மூன்று"]').click();

})
