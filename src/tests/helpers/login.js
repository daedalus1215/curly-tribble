const sessionFactories = require('../factories/sessionFactories');
const userFactory = require('../factories/userFactory');

const login = async (page) => {
    const user = await userFactory();
    const { session, sig } = sessionFactories(user);

    await page.setCookie({ name: 'session', value: session })
    await page.setCookie({ name: 'session.sig', value: sig })

    await page.goto('http://localhost:3000') // refresh after setting cookie to log us in.
    await page.waitForSelector('a[href="/auth/logout"]');
};

module.exports = login;