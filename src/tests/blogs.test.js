const {pageFactory, browserFactory} = require('./factories');
const { getContents, login } = require('./helpers');

test('when logged in, can see blog create form', async () => {
    //  Arrange
    const browser = await browserFactory();
    const page = await pageFactory(browser);
    await login(page)
    await page.goto('http://localhost:3000/blogs');

    // Act
    await page.click('a.btn-floating');
    const actual = await getContents(page, 'form label');

    // Assert
    expect(actual).toEqual('Blog Title');
    browser.close();
});
