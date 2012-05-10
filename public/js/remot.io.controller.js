/**
 * TODO: capture all touch events & gestures and pass them to client debounced
 * TODO: interpret touch events ( swipe up/down/left/right )
 * TODO[future]: debounce certain events
 * TODO: keep id in local storage
 */

(function ( $ ) {
	var rio = window.remot.io;

	function attachListeners() {
		$( document )
			.on( 'swipeLeft', 	onSwipe )
			.on( 'swipeRight', 	onSwipe )
			.on( 'swipeUp', 	onSwipe )
			.on( 'swipeDown', 	onSwipe )
			.on( 'touchmove', 	preventMove );
	}

	function onSwipe ( e ) {
		rio.socket.emit( 'control', { event: e.type });
		document.body.className = e.type;
	}

	function preventMove ( e ) {
		e.preventDefault();
	}

	init = function () {
		attachListeners();
	};

	init();

})( Zepto );