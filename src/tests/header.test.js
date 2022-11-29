const browserFactory = require('./factories/browserFactory');
const pageFactory = require('./factories/pageFactory');
const { getContents } = require('./helpers');
const login = require('./helpers/login');

test('should find header on homepage', async () => {
    // Arrange
    const browser = await browserFactory();
    const page = await pageFactory(browser);

    // Act
    const text = await page.$eval('a.brand-logo', el => el.innerHTML);

    // Assert
    expect(text).toEqual('Blogster');

    browser.close();
});

test('clicking login starts oauth flow', async () => {
    // Arrange
    const browser = await browserFactory();
    const page = await pageFactory(browser);

    // Act
    await page.click('.right a ');
    const url = await page.url();

    // Assert
    expect(url).toContain('https://accounts.google.com/o/oauth2/v2/auth');

    browser.close();
});

test('when signed in, shows logout button', async () => {
    //  Arrange
    const browser = await browserFactory();
    const page = await pageFactory(browser);

    // Act
    await login(page)

    // Assert
    const actual = await getContents(page, 'a[href="/auth/logout"]');
    expect(actual).toEqual('Logout');

    browser.close();
});