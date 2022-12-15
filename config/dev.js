const {
  googleClientID,
  googleClientSecret,
  mongoURI,
  redisURI,
  accessKeyId,
  secretAccessKey,
  bucketUrl
} = require('./passwords.json');

module.exports = {
  googleClientID,
  googleClientSecret,
  mongoURI,
  cookieKey: '123123123',
  redis: redisURI,
  accessKeyId, // s3
  secretAccessKey, // s3
  bucketUrl
}; 
