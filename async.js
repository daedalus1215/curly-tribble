const https = require('https');
const crypto = require('crypto');
const { fstat } = require('fs');

const start = Date.now();

function doRequest() {
    https
        .request('https://www.google.com', res => {
            res.on('data', () => { });
            res.on('end', () => {
                console.log(Date.now() - start);
            });
        }).end();
}

function doHash() {
    crypto.pbkdf2('a', 'b', 1000000, 512, 'sha512', () => {
        console.log('Hash:', Date.now() - start);
    })
}
fs.readFile('multitask.js', 'utf8', () => {
    console.log('FS:', Date.now() - start)
});
