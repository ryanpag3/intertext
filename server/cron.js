var CronJob = require('cron').CronJob;
var config = require('../config/config-public.json');
var tester = require('./util/test');

console.log('initializing cron utility');
tester.run();

var job = new CronJob({
  cronTime: config.test.interval_cron,
  onTick: function() {
        tester.run();
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
job.start();