var mysql = require('mysql');

const runServerSetup = function() {
    require('./cron');
}

module.exports = runServerSetup;