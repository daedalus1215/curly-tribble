const puppeteer = require('puppeteer');

const browserFactory = async () => {
    const browser = await puppeteer.launch({
        headless: false
    });

    return browser;
};

module.exports = browserFactory;    