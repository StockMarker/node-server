// usage: node historicalDataRequest.js <host>
var express = require('express'); // call express
var fs = require('fs');
var app = express();

//var bodyParser = require('body-parser');
var https = require('https');

var host = process.argv[2] || '127.0.0.1';
var port = 8080;

var options = {
    host: host,
    port: port,
    path: '/request/blp/refdata/HistoricalData',
    method: 'POST',
    rejectUnauthorized: false,
    key: fs.readFileSync('client.key'),
    cert: fs.readFileSync('client.crt'),
    ca: fs.readFileSync('bloomberg.crt')
};


app.get('/stocks', function(req, res) {
    var body = '';
    console.log("Hello");
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        console.log('/api/test');
        console.log(body);
    });

    res.writeHead(200);
    res.end();
});

https.createServer(options, app).listen(port);