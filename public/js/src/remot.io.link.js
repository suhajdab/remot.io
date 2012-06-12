( function ( $ ) {
	'use strict'
	
	function attachListener() {
		remot.io.socket.on( 'connect', onConnect );
	}

	function onConnect ( e ) {
		sendUid();
	}

	function sendUid() {
		remot.io.socket.emit( 'uid', { uid: remot.io.uid });
	}

	attachListener();

})( Zepto );