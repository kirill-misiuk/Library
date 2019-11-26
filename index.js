const express = require('express');
const dotenv = require('dotenv');
require('custom-env').env(true);
dotenv.config();
const app = express();

app.listen(function () {
    console.log('app listening at port %s', process.env.PORT);
});
