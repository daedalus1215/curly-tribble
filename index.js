const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

require('./models/User');
require('./models/Blog');
require('./services/passport');
require('./services/cache');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({ // responsible for maintaining our session for incoming requests. Anytime a user is loged into our app some of their data is stored inside of a cookie.
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize()); // to handle authentication inside of our app. Handles our entire oauth google process.
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/blogRoutes')(app);
require('./routes/uploadRoutes')(app);

if (['production', 'ci'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

const PORT = keys?.serverPort || 5001;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});
