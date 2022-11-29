const {pageFactory, browserFactory} = require('./factories');
const { getContents, login } = require('./helpers');

test('clicking login starts oauth flow', async () => {
    // Arrange
    const browser = await browserFactory();
    const page = await pageFactory(browser);

    const actual = await getContents(page, 'a.brand-logo');
    expect(actual).toEqual('Blogster');

    // Act
    await page.click('.right a ');
    
    // Assert
    const url = await page.url();
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