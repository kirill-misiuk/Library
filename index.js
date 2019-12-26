const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');


dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
console.log(process.env.NODE_ENV);
require('custom-env').env(true);
require('./features/book/BookRouter')(app);
require('./features/library/LibraryRouter')(app);
const AuthRepository = require('./features/authentication/AuthRepository');
const fdf = new AuthRepository();
fdf.connect();

app.listen(process.env.PORT, () => {
  console.log('app listening at port %s', process.env.PORT);
});
