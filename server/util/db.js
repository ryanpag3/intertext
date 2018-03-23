var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
});

connection.connect(function (err) {
    if (err) {
        console.log(err);
    }
    db.setupDb();
    console.log('database connection established');
});

var db = {
    setupDb: function () {
        connection.query('CREATE DATABASE IF NOT EXISTS intertext_db;', function (error, results, fields) {
            if (error) {
                console.log(error);
            }
        });

        connection.query('USE intertext_db', function (error, results, fields) {
            if (error) {
                console.log(error);
            }
        });


        connection.query('CREATE TABLE IF NOT EXISTS speed_reports (download_speed int, upload_speed int)', function (error, results, fields) {
            if (error) {
                console.log(error);
            }
        });
    },

    insertSpeedReport: function (download, upload) {
        console.log('inserting speed report. download: ' + download + ' and upload: ' + upload);
        var sql = "INSERT INTO speed_reports (upload_speed, download_speed) VALUES('" + upload + "','" + download + "')";
        connection.query(sql, function (error, results, fields) {
            if (error) {
                console.log(error);
            }
        });
    }
}

module.exports = db;