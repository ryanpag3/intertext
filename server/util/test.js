var speedTest = require('speedtest-net');
var twilio = require('twilio');
var q = require('q');
var config = require('../../config/config-public.json');
var configPrivate = require('../../config/config-private.json');
var twilioClient = new twilio(configPrivate.twilio.account_sid, configPrivate.twilio.auth_token);

const tester = {
    run: function () {
        var deferred = q.defer();
        var test = speedTest({
            maxTime: 10000
        });

        test.on('data', data => {
            console.log(data);
            if (!isAdvertisedSpeeds(data)) {
                sendSpeedAlert(data);
            }
        });

        test.on('error', err => {
            console.error(err);
        });
    }
}

function isAdvertisedSpeeds(data) {
    return data.speeds.download > config.test.download_speed_mbits && data.speeds.upload > config.test.upload_speed_mbits;
}

function sendSpeedAlert(data) {

    for (var i = 0; i < configPrivate.twilio.numbers.length; i++) {
        twilioClient.messages.create({
                body: 'This is a friendly reminder that you are not receiving your advertised internet speeds.' +
                ' You are getting ' + Math.trunc(data.speeds.download) + '/' + config.test.download_speed_mbits + ' download Mbit/s and ' +
                Math.trunc(data.speeds.upload) + '/' + config.test.upload_speed_mbits + ' upload Mbit/s.',
                to: configPrivate.twilio.numbers[i],
                from: configPrivate.twilio.address
            })
            .then((message) => console.log('Text message sent to ' + message.to));
    }


}

module.exports = tester;