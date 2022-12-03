const puppeteer = require('puppeteer');

const browserFactory = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox'] // speed up our travis builds.
    });

    return browser;
};

module.exports = browserFactory;    