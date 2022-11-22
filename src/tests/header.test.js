const puppeteer = require('puppeteer');

test('what', async () => {
    const browser = await puppeteer.launch({
        headless:false
    });
    const page = await browser.newPage();

})