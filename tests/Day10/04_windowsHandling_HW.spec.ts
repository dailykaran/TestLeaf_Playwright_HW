import {test, expect} from "@playwright/test"

test('Handling the concurrent method on sales force page', async({page, context}) => {

    await page.goto("https://login.salesforce.com/");
    await page.locator("#username_container input.input.username").fill("dinakaran@company.sandbox");
    await page.locator("input.input.password").fill("Testing83$");
    await page.locator("input.button#Login").click();
    await page.waitForLoadState();


    //Click on the "Learn More” button under Mobile Publisher 
    const [windowNew] = await Promise.all([
        context.waitForEvent("page"),
        await page.locator('button[title="Learn More"]').click()
    ])

    //Capture the title of the new window that opens 
    const learnTitle = await windowNew.title();
    console.log(`${learnTitle}`);
    await expect(windowNew).toHaveURL(/.*HelpAndTrainingDoor/);

    // - Click the ‘Confirm’ button on the page 
    await windowNew.locator('button[onclick="goAhead()"]').click();

    // Assert the title and url of the page 
    const newWindowTitle = await windowNew.title()
    console.log(`${newWindowTitle}`);
    await expect(windowNew).toHaveURL(/.*cloud/);

})
