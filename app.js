/**
 * TODO: [future] offer to connect devices on same ip [handshake event?]
 *   io.sockets.on("connection", function (socket) {
					var address = socket.handshake.address;
					console.log("New connection from " + address.address + ":" + address.port);
			}
 * 
 * TODO: https://github.com/h5bp/server-configs/blob/master/node/node.js ??
 * TODO: verify uid correctness
 * TODO: css join & minify
 * TODO: add status indicator to bookmarklet
 * TODO: multiple receivers, single controller ?
 * TODO: 404
 * TODO: seperate out app.js parts by using var obj=require('./relative/path/to/js')
 */


/**
 * Module dependencies.
 */

var express = require("express"),
	routes = require('./routes' ),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	port    = process.env.PORT || 3000;


// Set up compact for .js join & minify
var compact = require('compact').createCompact({
	srcPath: __dirname + '/public/js/src/',
	destPath: __dirname + '/public/js/compact/',
	webPath: '/js/compact/',
	debug: false
});

compact.addNamespace('global')
	.addJs('/libs/socket.io.js')
	.addJs('/libs/zepto.js')
	.addJs('/remot.io.js');
	//.addJs('/remot.io.storage.js')

compact.addNamespace('controller')
	.addJs('/remot.io.controller.socket.js')
	.addJs('/remot.io.link.js')
	.addJs('/remot.io.status.js')
	.addJs('/remot.io.controller.events.js');

compact.addNamespace('default')
	.addJs('/libs/Math.uuid.js')
	.addJs('/libs/qrcode.js')
	.addJs('/libs/html5-qrcode.js')
	.addJs('/remot.io.qrcode.js')
	.addJs('/remot.io.receiver.socket.js')
	.addJs('/remot.io.link.js')
	.addJs('/remot.io.status.js')
	.addJs('/remot.io.steps.js')
	.addJs('/remot.io.configs.js');

compact.addNamespace('bookmarklet')
	.addJs('/libs/socket.io.js')
	.addJs('/libs/zepto.js')
	.addJs('/libs/window.visibly.js')
	.addJs('/remot.io.js')
	.addJs('/remot.io.configs.js')
	//.addJs('/remot.io.storage.js')
	.addJs('/remot.io.trigger.js')
	.addJs('/remot.io.receiver.socket.js')
	.addJs('/remot.io.link.js')
	.addJs('/remot.io.receiver.events.js');

app.use(compact.js(['global']));

app.get('/*/c', compact.js(['global','controller']));
app.get('/js/compact/bookmarklet.js', compact.js(['bookmarklet']));
app.get('/', compact.js(['global','default']));


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

// Expressjs routes
app.get('/:uid/c', routes.controller);
app.get('/:uid/bm.js', routes.bookmarklet);
app.get('/', routes.index);

server.listen(port);




/*  remot.io  */
var controllerSockets = {}, receiverSockets = {};


//  Receiver prototype
function Receiver ( socket ) {
	this.socket = socket;
	this.socket
		.on( 'uid', this.onUid.bind( this ))
		.on( 'disconnect', this.onDisconnect.bind( this ));
}

Receiver.prototype = {
	onUid: function ( e ) {
		this.uid = e.uid;
		receiverSockets[ this.uid ] = this.socket;
		this.emitToController( 'status', { 
			status: 'linked',
			address: this.socket.handshake
		});
		if ( controllerSockets[ this.uid ] ) this.socket.emit( 'status', { status: 'linked' });
	},
	onDisconnect: function ( e ) {
		this.emitToController( 'status', { status: 'unlinked'} );
		delete receiverSockets[ this.uid ];
	},
	emitToController: function ( name, data ) {
		if ( controllerSockets[ this.uid ] ) {
			controllerSockets[ this.uid ].emit( name, data );
		}
	}
}


//  Controller prototype
function Controller ( socket ) {
	this.socket = socket;
	this.socket
		.on( 'uid', this.onUid.bind( this ))
		.on( 'control', this.onControl.bind( this ))
		.on( 'disconnect', this.onDisconnect.bind( this ));
}

Controller.prototype = {
	onUid: function ( e ) {
		this.uid = e.uid;
		controllerSockets[ this.uid ] = this.socket;
		this.emitToReceiver( 'status', { status: 'linked' });
		if ( receiverSockets[ this.uid ] ) this.socket.emit( 'status', { 
			status : 'linked',
			address: this.socket.handshake
		}); 
	},
	onControl: function ( e ) {
		this.emitToReceiver( 'control', { type: e.type });
	},
	onDisconnect: function ( e ) {
		this.emitToReceiver( 'status', { status: 'unlinked'} );
		delete controllerSockets[ this.uid ];
	},
	emitToReceiver: function ( name, data ) {
		if ( receiverSockets[ this.uid ] ) {
			receiverSockets[ this.uid ].emit( name, data );
		}
	}
}

/*  socket.io  */
var controllers = io
	.of( '/controller' )
	.on( 'connection', function ( socket ) {
		new Controller ( socket );
	});
var receivers = io
	.of( '/receiver' )
	.on( 'connection', function ( socket ) {
		new Receiver ( socket );
	});


/*
io.sockets.on('connection', function (socket) {
	socket.on('control', function (data) {
		socket.broadcast.emit('control', data );
		console.log(data)
	});
	var address = socket.handshake.address;
	console.log("New connection from " + address.address + ":" + address.port);
});*/





/*!
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com

Copyright (c) 2010 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/
(function() {
	// Private array of chars to use
	var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');

	Math.uuid = function (len, radix) {
		var chars = CHARS, uuid = [], i;
		radix = radix || chars.length;

		if (len) {
			// Compact form
			for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
		} else {
			// rfc4122, version 4 form
			var r;

			// rfc4122 requires these characters
			uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
			uuid[14] = '4';

			// Fill in random data.  At i==19 set the high bits of clock sequence as
			// per rfc4122, sec. 4.1.5
			for (i = 0; i < 36; i++) {
				if (!uuid[i]) {
					r = 0 | Math.random()*16;
					uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
				}
			}
		}

		return uuid.join('');
	};
})();