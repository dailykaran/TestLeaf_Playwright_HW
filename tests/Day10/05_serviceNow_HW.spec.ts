import {expect, test, chromium} from "@playwright/test";


test('Handing the frames using Service Now website with shadow DOM', async({page}) => {

    await page.goto('https://account.servicenow.com/sign-in');

    await page.locator('body #sign-in').locator('input[id=email]').first().fill('dinakaran83@gmail.com');
    await page.locator('body #sign-in').locator('#submit_form').first().click();
    await page.waitForLoadState("load");
    await page.locator('body #sign-in').locator('input#password').first().fill('Testing123$');
    await page.locator('body #sign-in').locator('#submit_form').first().click();
    await page.waitForLoadState("load");

    await page.waitForTimeout(6000);
    await page.goto("https://dev211073.service-now.com/");
    await page.locator("#user_name").fill('admin');
    const password = page.locator('#user_password');
    await password.fill('Testing@123');


    await page.locator('#sysverb_login').click();
    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL(/.*params/);


    await page.waitForSelector('#SEISMIC_ARIA_LIVE_REGION_ASSERTIVE', {state: 'visible'});
    await page.waitForTimeout(2000);


    await page.locator('body sn-polaris-layout[dir="ltr"] div.header-bar .starting-header-zone').getByLabel("All", { exact: true }).click();
    await page.locator('body input#filter').fill('Service Catalog');
    await page.locator('body a[href*="catalog_home"]').first().click();


    await page.waitForLoadState("domcontentloaded");
    // This page have shadowDOM Hence, "Body" tag taken before all shadowDOM to handle other DOM. "iframe" given after the shadow dom
    const getShadowDOM_IFrame = page.locator('body').frameLocator('iframe[title="Main Content"]');


    await getShadowDOM_IFrame.locator('a[href*="catalog_default"][aria-label*="Mobiles. Cell phones"]').click();
    await getShadowDOM_IFrame.locator('tr td a[class="service_catalog"]').nth(0).click();
    await getShadowDOM_IFrame.locator('.sc-radio input[value="no"]+label').click();
    await getShadowDOM_IFrame.locator('select.form-control.cat_item_option').selectOption({value: '500MB'});
    console.log("Monthly data Drop_down count: " + await getShadowDOM_IFrame.locator('select.form-control.cat_item_option >option').count());
   
    await getShadowDOM_IFrame.locator('.sc-radio input[value="starlight"]+label').click();
    expect(await getShadowDOM_IFrame.locator('.sc-radio input[value="starlight"]+label').innerText()).toContain('Starlight');

    await getShadowDOM_IFrame.locator('.input-group-radio input[value="256"]+label').click();
    expect(await getShadowDOM_IFrame.locator('.input-group-radio input[value="256"]+label').innerText()).toContain('256 GB');

    await getShadowDOM_IFrame.locator('button#oi_order_now_button').click();
    await page.waitForLoadState("domcontentloaded");

    const getOrderTitle = (await page.title()).toString();
    console.log(getOrderTitle);
    expect(getOrderTitle).toContain('ServiceNow');
    //expect(page).toHaveTitle('Apple iPhone 13 | ServiceNow');
   
    const getOrderURL = await page.url().toString();
    console.log(getOrderURL);
    await expect(getOrderURL).toContain("catalog_default");


    const orderSuccessMessage = await getShadowDOM_IFrame.locator('.notification-success span').nth(1).innerText();
    console.log(orderSuccessMessage);
    expect(orderSuccessMessage).toEqual('Thank you, your request has been submitted')
   
})

