const express = require('express');
const config = require('./common/config/env.config');
const app = express();

app.listen(config.port, function () {
    console.log('app listening at port %s', config.port);
});