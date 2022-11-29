const getContents = async (page, selector) => {
    const content = await page.$eval(selector, el => el.innerHTML);
    return content;
};

module.exports = getContents;