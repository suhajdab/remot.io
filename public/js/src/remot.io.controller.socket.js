/**
 * TODO: use Page Visibility API to dis/re-connect ( https://gist.github.com/1122546 )
 */

( function (){
	'use strict'
	
	if ( !io ) throw ( 'socketio not found' );
	remot.io.socket = io.connect( '//' + location.host + '/controller' );
})();