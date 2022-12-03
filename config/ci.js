const { googleClientID, googleClientSecret, mongoURI, redisURI, serverPort } = require('./ci-passwords.json');

module.exports = {
  googleClientID,
  googleClientSecret,
  mongoURI,
  cookieKey: '123123123',
  redis: redisURI,
  serverPort: serverPort
}; 
