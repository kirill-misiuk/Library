const express = require('express');
const config = require('./common/config/env.config');
const dotenv = require ('dotenv');
const app = express();
dotenv.config ();
app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});