const {HomePage} = require('../ui/page_objects/HomePage');
const {test} = require('@playwright/test')


exports.test = test.extend({
    homePage: async ({page}, use) => {
        await use(new HomePage(page));
    }
});

exports.expect = test.expect;