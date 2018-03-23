var CronJob = require('cron').CronJob;
var config = require('../config/config-public.json');
var tester = require('./util/test');

tester.run();

var testJob = new CronJob({
  cronTime: config.test.interval_cron,
  onTick: function() {
      var includeAlerts = true;
        tester.run(includeAlerts);
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
testJob.start();
console.log('cron - test job interval started.');

var dataGenerateJob = new CronJob({
  cronTime: config.data.interval_cron,
  onTick: function() {
      tester.run();
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
dataGenerateJob.start();
console.log('cron - report job interval started.');