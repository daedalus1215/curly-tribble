const AWS = require('aws-sdk');
const keys = require('../config/keys');
const uuid = require('uuid');
const requireLogin = require('../middlewares/requireLogin');
const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
});

module.exports = app => {
    app.get('/api/upload', requireLogin, (req, res) => {
        const key = `${req.user.id}/${uuid.v1()}.png`;
        // Get a presigned url and respond back to the client with it.
        s3.getSignedUrl('putObject', {
            Bucket: 'my-blog-bucket-1239875',
            ContentType: 'image/jpeg',
            Key: key
        }, (err, url) => res.send({ key, url }));
    });
};