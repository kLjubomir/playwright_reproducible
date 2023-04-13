const {test} = require('../../fixtures/PageObjectFixture');
const {expect} = require('@playwright/test')

test('Searches for oracle or uber asserts that page is loaded @smoke @de @uk', async ({page, homePage}, workerInfo) => {
    
    const target = workerInfo.project.name === 'de'? "oracle" : "uber";

    await homePage.openHomePage();
    await homePage.closeCookies();
    await page.waitForLoadState('networkidle');
    await homePage.searchFor(target);
    await homePage.openFirstResult();
    expect(page.url()).toContain(target.toLowerCase())
});