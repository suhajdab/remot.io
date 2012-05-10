/**
 * TODO: if no hash detected generate it
 * TODO: broadcast server events to registered clients only
 * TODO: inform server of client connection status
 * TODO: [future] offer to connect to devices on same ip
 * 
 * TODO: https://github.com/h5bp/server-configs/blob/master/node/node.js ??
 */


/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes');

var app = module.exports = express.createServer(),
	io = require('socket.io').listen(app);


// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
//  controller route
app.get('/:id/c', routes.controller);
//  receiver/config/main route
app.get('/:id/bm.js', routes.bookmarklet);
app.get('/', routes.index);

app.listen(80);


io.sockets.on('connection', function (socket) {
  socket.on('control', function (data) {
    socket.broadcast.emit('control', data );
    console.log(data)
  });
});