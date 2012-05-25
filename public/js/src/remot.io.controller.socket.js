( function (){
	'use strict'
	
	if ( !io ) throw ( 'socketio not found' );
	remot.io.socket = io.connect( '//' + location.host + '/controller' );
})();