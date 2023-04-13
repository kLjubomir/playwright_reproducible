const {test} = require('../../fixtures/PageObjectFixture');
const {expect} = require('@playwright/test')

test('Searches for youtube or twitter asserts that page is loaded @smoke @de @uk', async ({page, homePage}, workerInfo) => {
    
    const target = workerInfo.project.name === 'de'? "youtube" : "twitter";

    await homePage.openHomePage();
    await homePage.closeCookies();
    await page.waitForLoadState('networkidle');
    await homePage.searchFor(target);
    await homePage.openFirstResult();
    expect(page.url()).toContain(target.toLowerCase())
});