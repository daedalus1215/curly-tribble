const { Page } = require("puppeteer");


class CustomPage {
    static async build() {
        const browser = await puppeteer.launch({
            headless: false
        });

        const page = await browser.newPage();

        const customPage = new CustomPage(page);

        return new Proxy(customPage, {
            get: function(target, property) {
                return target[property] || page[property];
            }
        });
    }

    constructor(page) {
        this.page = page;
    }

    login() {
        this.page.goto('http://localhost:3000');
        this.page.setCookie();
    }
}

module.exports = CustomPage;