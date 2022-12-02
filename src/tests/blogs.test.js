const { pageFactory, browserFactory } = require('./factories');
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

    describe('And valid inputs', async () => {
        beforeEach(async () => {
            await page.type('.title input', 'My Title');
            await page.type('.content input', 'My Content');
            await page.click('form button');
        });

        test('Submittin takes user to review screen', async () => {
            const text = await getContents(page, 'h5');
            expect(text).toEqual('Please confirm your entries');
            browser.close();
        });

        test('Submittin then saving adds blog to index page', async () => {
            await page.click('button.green');
            await page.waitForSelector('.card');

            const title = await getContents(page, '.card-title');
            const content = await getContents(page, 'p');

            expect(title).toEqual('My Title');
            expect(content).toEqual('My Content');
            browser.close();
        });
    })

    describe('And using invalid inputs', async () => {
        beforeEach(async () => {
            await page.click('form button');
        });

        test('the form shows an error message', async () => {
            const titleError = await getContents(page, '.title .red-text');
            const contentError = await getContents(page, '.content .red-text');

            expect(titleError).toEqual('You must provide a value');
            expect(contentError).toEqual('You must provide a value');
            browser.close();
        })
    })
});

describe('when not logged in', async () => {
    let browser;
    let page;

    beforeEach(async () => {
        browser = await browserFactory();
        page = await pageFactory(browser);
        await page.goto('http://localhost:3000/blogs');
    });

    test('User cannot create blog posts', async () => {
        browser = await browserFactory();
        page = await pageFactory(browser);

        const actual = await page.evaluate(() => fetch('/api/blogs', {
            method: 'post',
            Credential: 'same-origin',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title: 'My Title', content: 'My Content' })
        })
            .then(res => res.json()));

        expect(actual).toEqual({error: 'You must log in!'});
        browser.close();
    });

    test('User cannot get blog posts', async () => {
        browser = await browserFactory();
        page = await pageFactory(browser);

        const actual = await page.evaluate(() => fetch('/api/blogs', {
            method: 'GET',
            Credential: 'same-origin',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json()));

        expect(actual).toEqual({error: 'You must log in!'});
        browser.close();
    });
});