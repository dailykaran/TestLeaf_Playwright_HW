/*
Interact with the Click Me button inside frame
- Assert the text changed after clicking the button
- Get the total count of frames present in the page
- Interact with the Click Me button present inside the nested frames
- Assert the text changed after clicking the button
*/


import {expect, test} from "@playwright/test";


test('Handing the frames', async({page}) => {

    //Interact with the Click Me button inside frame
    await page.goto("https://leafground.com/frame.xhtml");
    const iframeName = page.frame({name: 'frame2'});
    iframeName?.click('button#Click');
    const getbuttonText = await iframeName?.getByRole('button', {name: 'Hurray'}).innerText();
    console.log('It is showing frame2 button text: ' + (getbuttonText)?.toString());
    //Assert the text changed after clicking the button
    expect((getbuttonText)?.toString()).toContain('Clicked');




    //Get the total count of frames present in the page
    await page.goto('https://leafground.com/frame.xhtml');
    const getFrameCount = page.frames();
    console.log("Total Number of frames: " + getFrameCount.length);
    console.log("The mainframe URL is: " + page.mainFrame().url());
   
    for (const aFrame of getFrameCount) {
        //console.log(aFrame.url());
        if( aFrame.childFrames().length > 0) {
            const getFrameURL = aFrame.url();
            const getFrameChildNames = aFrame.childFrames();
            for (const aChildframe of getFrameChildNames) {
                console.log(`${aFrame.url()} have a childframe ${aFrame.childFrames().length} and URL is ${aChildframe.url()}`);
            }
        }
    }
   
    // - Interact with the Click Me button present inside the nested frames
   
    const card = page.locator(".card").filter({hasText:"(Inside Nested frame)"});
    const frameOne = card.frameLocator("iframe");
    const frameTwo = frameOne.frameLocator("iframe");
    await frameTwo.locator("#Click").click();


    //- Assert the text changed after clicking the button
    const nestedBtnName = await frameTwo.locator('#Click').innerText()
    expect(nestedBtnName).toContain('Clicked');
    console.log('Nested frame button text is ' + nestedBtnName);
   
})
