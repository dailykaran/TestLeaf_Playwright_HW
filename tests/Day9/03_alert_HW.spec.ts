import {test} from '@playwright/test'

test('Handling the Alert dialogs', async({page})=> {

    await page.goto("https://www.w3schools.com/js/tryit.asp?filename=tryjs_confirm");
    
    /* const getFrameLength = page.frames().length;
    console.log(`${getFrameLength}`); */

    page.on("dialog", async dialog => {
        const message = dialog.message();
        console.log(`The message says ${message}`);
        const type = dialog.type()
        console.log(`The type of alert ${type}`);
        
        if(type === "confirm"){
            await dialog.accept();
        }else if (type === "prompt"){
            await dialog.accept("Testcloud");
        }else {
            await dialog.dismiss();
        }
    })

    await page.locator('#iframewrapper').frameLocator('iframe').locator('body button').click();

    const getInnerText = await page.locator('#iframewrapper').frameLocator('iframe').locator('p#demo').innerText();
    console.log(getInnerText);


})

