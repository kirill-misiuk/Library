const express = require('express');
const config = require('./keys/keys');
const dotenv = require ('dotenv');
const app = express();
dotenv.config ();
app.listen(config.port, function () {
    console.log('app listening at port %s', config.PORT);
});
