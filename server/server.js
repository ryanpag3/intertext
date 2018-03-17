const config = require('../config/config-public.json');
const express = require('express');
const speedTest = require('speedtest-net');
const app = express();

require('./server-setup')();

app.listen(config.server.port, function() {
    console.log('intertext started on port ' + config.server.port);
});