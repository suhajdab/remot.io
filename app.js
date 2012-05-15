/**
 * TODO: use github.com/broofa/node-uuid for pair id
 * TODO: broadcast server events to registered clients only
 * TODO: inform server of client connection status
 * TODO: [future] offer to connect to devices on same ip
 *   io.sockets.on("connection", function (socket) {
          var address = socket.handshake.address;
          console.log("New connection from " + address.address + ":" + address.port);
      }
 * 
 * TODO: https://github.com/h5bp/server-configs/blob/master/node/node.js ??
 */


/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes');

var app = module.exports = express.createServer();


// Set up compact for .js join & minify
var compact = require('compact').createCompact({
  srcPath: __dirname + '/public/js/src/',
  destPath: __dirname + '/public/js/compact/',
  webPath: '/js/compact/',
  debug: false
});

compact.addNamespace('global')
  .addJs('/libs/socket.io.js')
  .addJs('/libs/zepto.min.js')
  .addJs('/remot.io.js')
  .addJs('/remot.io.storage.js')

compact.addNamespace('controller')
  .addJs('/remot.io.controller.socket.js')
  .addJs('/remot.io.controller.events.js');

compact.addNamespace('index')
  .addJs('/libs/Math.uuid.js')
  .addJs('/libs/qrcode.js')
  .addJs('/libs/html5-qrcode.js')
  .addJs('/remot.io.receiver.socket.js')
  .addJs('/remot.io.receiver.events.js');

compact.addNamespace('bookmarklet')
  .addJs('/libs/socket.io.js')
  .addJs('/libs/zepto.min.js')
  .addJs('/remot.io.js')
  .addJs('/remot.io.storage.js')
  .addJs('/remot.io.receiver.socket.js')
  .addJs('/remot.io.receiver.events.js');

app.use(compact.js(['global']));

app.get('/:id/c', compact.js(['global','controller']));
app.get('/js/compact/bookmarklet.js', compact.js(['bookmarklet']));
app.get('/', compact.js(['global','index']));


// expressjs configuration
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


/*  socket.io  */
io = require('socket.io').listen(app);

var controller = io
  .of( '/controller' )
  .on( 'connection', function ( socket ) {
    socket.on('control', function (data) {
      receiver.emit('control', data );
      console.log(data);
  });
});
var receiver = io
  .of( '/receiver' ).on( 'connection', function ( socket ) {
    console.log(socket);
  });
  // .on( 'connection', function ( socket ) {
  //   socket.on('control', function (data) {
  //   socket.broadcast.emit('control', data );
  //   console.log(data)
  // });
/*
io.sockets.on('connection', function (socket) {
  socket.on('control', function (data) {
    socket.broadcast.emit('control', data );
    console.log(data)
  });
  var address = socket.handshake.address;
  console.log("New connection from " + address.address + ":" + address.port);
});*/