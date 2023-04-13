class HomePage {


    constructor(page) {
        this.page = page;

    }

    async openHomePage() {
        await this.page.goto('/');
    }

    async closeCookies() {
        await this.page.locator('button').nth(3).click();
    }

    async searchFor(text) {
        await this.page.locator('input').first().type(text)
        await this.page.locator('input').first().press("Enter");
    }

    async openFirstResult() {
        await this.page.locator('h3').first().click();
    }

    
}

module.exports = {HomePage};