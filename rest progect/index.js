const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(session({
  secret: 'vlcooglkavghjfjghk]dg',
  resave: true,
  saveUninitialized: true,
  cookie: {
    expires: 10800000,
    httpOnly: false,
  },
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: 'http://localhost:3000',
}));

console.log(process.env.NODE_ENV);
require('custom-env').env(true);
require('./mongoDB/connect')();
require('./features/book/BookRouter')(app);
require('./features/library/LibraryRouter')(app);
require('./features/authentication/AuthRouter')(app, passport);


app.listen(process.env.PORT, () => {
  console.log('app listening at port %s', process.env.PORT);
});
