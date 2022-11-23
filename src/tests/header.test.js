const puppeteer = require('puppeteer');

test('what', async () => {
    const browser = await puppeteer.launch({
        headless:false
    });
    const page = await browser.newPage();
    await page.goto('http://localhost:3000'); // going to the page is going to some amount of time, so we want to await.
    
})  