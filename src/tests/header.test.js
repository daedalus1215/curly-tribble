const puppeteer = require('puppeteer');

let browser;
let page;

beforeEach(async () => {
    // Arrange
    browser = await puppeteer.launch({
        headless:false
    });
    page = await browser.newPage();
    
    await page.goto('http://localhost:3000'); // going to the page is going to some amount of time, so we want to await.

});

test('should find header on homepage', async () => {
    // Arrange
    
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);

    expect(text).toEqual('Blogster');
})  