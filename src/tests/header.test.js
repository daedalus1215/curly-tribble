const { session } = require('passport');
const puppeteer = require('puppeteer');

let browser;
let page;

beforeEach(async () => {
    // Arrange
    browser = await puppeteer.launch({
        headless: false
    });
    page = await browser.newPage();

    await page.goto('http://localhost:3000'); // going to the page is going to some amount of time, so we want to await.

});

afterEach(async () => {
    await browser.close();
});

test('should find header on homepage', async () => {
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
    const id = '637113ead93b0d22ba042006';
    const Buffer = require('safe-buffer').Buffer;
    const sessionObject = {
        passport: {
            user: id
        }
    }
    const session = Buffer
        .from(JSON.stringify(sessionObject))
        .toString('base64')

    console.log('session', session);
    const Keygrip = require('keygrip');
    const keys = require('../../config/keys');

    const keygrip = new Keygrip([keys.cookieKey]);
    const sig = keygrip.sign(`session=${session}`);

    console.log('sig', sig);

    // Act

    // Assert
});