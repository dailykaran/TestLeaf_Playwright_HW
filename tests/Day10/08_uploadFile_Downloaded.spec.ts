import {test, expect } from "@playwright/test"
import path from "path";
const fs = require('fs');

test('file upload', async({page,}) => {

    await page.goto('https://the-internet.herokuapp.com/upload');
    //Upload an image inside the red square area
    const filePromise = page.waitForEvent("filechooser");
    await page.locator('#drag-drop-upload').click();
    const fileChooser =await filePromise;
    await fileChooser.setFiles([path.join(__dirname, "RoadCycleParis.png")]);
    //Assert that the file has been uploaded 
    await expect(page.locator("#drag-drop-upload")).toHaveClass('dz-success-mark dz-clickable dz-started');

    await page.waitForTimeout(1000);
    // Upload a document without clicking the Upload button on the page
    await page.locator('input#file-upload').setInputFiles([path.join(__dirname, "InputTextTesting.txt")]);
    await page.locator('input#file-submit').click();
    //Assert that the file has been uploaded 
    expect(await page.locator('.example h3').innerText()).toContain('File Uploaded!');

})

test('file download', async({page,}) => {

    await page.goto('https://the-internet.herokuapp.com/download');
    // Download file.json from the list of files     
    const fileDownloadPromise = page.waitForEvent("download");
    await page.locator('.example a[href*="random"]').click();
    const filedownload =await fileDownloadPromise;

    console.log((await filedownload.path()).toString());    
    const combinedPath = path.join("download/"+filedownload.suggestedFilename());
    await filedownload.saveAs(combinedPath);

    // Assert that the file has been downloaded in the required path 
    expect(fs.existsSync(combinedPath)).toBeTruthy();
    expect(filedownload.suggestedFilename()).toBe('random_data.txt');
    console.log(combinedPath);
    

})