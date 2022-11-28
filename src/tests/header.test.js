const { session } = require('passport');
const puppeteer = require('puppeteer');
const sessionFactories = require('./factories/sessionFactories');
const userFactory = require('./factories/userFactory');

let page;
let browser; 
beforeEach(async () => {
    // Arrange
    browser = await puppeteer.launch({
        headless: false
    });

    page = await browser.newPage();
    await page.goto('http://localhost:3000');
});

afterEach(async () => {
    await page.close();
});

test.only('should find header on homepage', async () => {
    // Act
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);

    // Assert
    expect(text).toEqual('Blogster');
});

test('clicking login starts oauth flow', async () => {
    // Arrange

    // Act
    await page.click('.right a ');
    const url = await page.url();

    // Assert
    expect(url).toContain('https://accounts.google.com/o/oauth2/v2/auth');
});

test('when signed in, shows logout button', async () => {
    // Arrange
    const user = await userFactory();
    const { session, sig } = sessionFactories(user);

    await page.setCookie({ name: 'session', value: session })
    await page.setCookie({ name: 'session.sig', value: sig })

    // Act
    await page.goto('http://localhost:3000') // refresh after setting cookie to log us in.
    await page.waitForSelector('a[href="/auth/logout"]');

    // Assert
    const actual = await page.$eval('a[href="/auth/logout"]', el => el.innerHTML);
    expect(actual).toEqual('Logout');
});