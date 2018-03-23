var assert = require('assert');
var db = require('./db');

describe ('db.js unit tests', function () {
    beforeEach(function(done) {
        db.setupDb();
        done();
    });

    describe('#insertSpeedReport()', function() {
        it ('should serialize a report', function(done) {
            var upload = 10, download = 100;
            try {
            db.insertSpeedReport(100, 10);
            } catch (e) {
                console.log(e)
            }
            // done();
        })
    })
})