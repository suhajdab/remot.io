/**
 * TODO: if no hash detected generate it
 * TODO: broadcast server events to registered clients only
 * TODO: inform server of client connection status
 */


var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<title>remot.io</title><h1>remot.io</h1>');
}).listen(3000);