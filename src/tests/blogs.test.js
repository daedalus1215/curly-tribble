const {pageFactory, browserFactory} = require('./factories');
const { getContents, login } = require('./helpers');

describe('when logged in', async () => {
    let browser;
    let page;

    beforeEach(async () => {
        browser = await browserFactory();
        page = await pageFactory(browser);
        await login(page)
        await page.goto('http://localhost:3000/blogs');

        await page.click('a.btn-floating')
    });

    test('can see blog create form', async () => {
        //  Arrange & Act
        const actual = await getContents(page, 'form label');
    
        // Assert
        expect(actual).toEqual('Blog Title');
        browser.close();
    });
});
