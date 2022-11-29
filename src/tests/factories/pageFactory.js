
const pageFactory = async (browser) => {
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    return page;
};

module.exports = pageFactory;