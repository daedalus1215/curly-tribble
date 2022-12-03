const { googleClientID, googleClientSecret, mongoURI, redisURI } = require('./passwords.json');

module.exports = {
  googleClientID,
  googleClientSecret,
  mongoURI,
  cookieKey: '123123123',
  redis: redisURI
}; 
