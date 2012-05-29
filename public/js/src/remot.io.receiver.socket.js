/**
 * TODO: set host to remot.io
 */

(function(){
	'use strict'

	if (!io) throw ( 'socketio not found' );
	remot.io.socket = io.connect( '//' + location.host + '/receiver', { host: 'remot.io'} );
})();