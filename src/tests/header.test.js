const puppeteer = require('puppeteer');

test('should find header on homepage', async () => {
    // Arrange
    const browser = await puppeteer.launch({
        headless:false
    });
    const page = await browser.newPage();
    
    // Act
    await page.goto('http://localhost:3000'); // going to the page is going to some amount of time, so we want to await.

    const text = await page.$eval('a.brand-logo', el => el.innerHTML);

    expect(text).toEqual('Blogster');
})  