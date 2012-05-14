/**
 * TODO: capture all touch events & gestures and pass them to client debounced
 * TODO: interpret touch events ( swipe up/down/left/right )
 * TODO[future]: debounce certain events
 * TODO: keep id in local storage
 * TODO: status feedback: disconnected (red), connected without receiver (orange), connected to receiver (green)
 */

(function ( $ ) {

	function attachListeners() {
		$( document )
			.on( 'swipeLeft', 	onSwipe )
			.on( 'swipeRight', 	onSwipe )
			.on( 'swipeUp', 	onSwipe )
			.on( 'swipeDown', 	onSwipe )
			.on( 'touchmove', 	onTouchMove );
	}

	function onSwipe ( e ) {
		remot.io.socket.emit( 'control', { event: e.type });
		document.body.className = e.type;
	}

	function onTouchMove ( e ) {
		e.preventDefault();
	}

	attachListeners();

})( Zepto );