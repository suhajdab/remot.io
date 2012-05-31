/**
 */

(function(){
	'use strict'

	var opts = {};

	//	if we don't have io, the party is over
	if ( !io ) throw ( 'socketio not found' );

	//	if we're not local debugging, io host should always be remot.io
	if ( location.host != 'onembp.local' ) opts.host = 'remot.io';

	//	set up receiver socket
	remot.io.socket = io.connect( '//' + location.host + '/receiver', opts );
})();