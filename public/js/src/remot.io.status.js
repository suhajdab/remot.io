( function ( $ ) {

	function setStatus ( status ) {
		document.body.dataset.status = status;
	}

	function onStatus ( e ) {
		setStatus( e.status );
	}

	function onConnect () {
		setStatus( 'unlinked' );
	}

	function onDisconnect () {
		setStatus( '' );
	}

	remot.io.socket.on( 'status', onStatus );
	remot.io.socket.on( 'connect', onConnect );
	remot.io.socket.on( 'disconnect', onDisconnect );

})( Zepto );