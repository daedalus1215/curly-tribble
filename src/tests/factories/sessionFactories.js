const Keygrip = require('keygrip');
const keys = require('../../../config/keys');
const Buffer = require('safe-buffer').Buffer;

const keygrip = new Keygrip([keys.cookieKey]);
module.exports = (user) => {
    const sessionObject = {
        passport: {
            user: user._id.toString()
        }
    }
    const session = Buffer
        .from(JSON.stringify(sessionObject))
        .toString('base64')

    console.log('session', session);

    const sig = keygrip.sign(`session=${session}`);
    console.log('sig', sig);
    return { session, sig };
};