var CronJob = require('cron').CronJob;
var config = require('../config/config-public.json');
var tester = require('./util/test');

tester.run();

var testJob = new CronJob({
  cronTime: config.test.interval_cron,
  onTick: function() {
        tester.run();
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
testJob.start();
console.log('cron - test job interval started.');

var reportJob = new CronJob({
  cronTime: config.report.interval_cron,
  onTick: function() {
        // TODO
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
reportJob.start();
console.log('cron - report job interval started.');