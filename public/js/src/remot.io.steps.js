( function ( $ ) {
	'use strict'

	var zSteps = $( 'section' );

	function init () {
		setCurrent( 0 );
		remot.io.socket.on( 'status', onStatus );
		remot.io.socket.on( 'control', onControl );
	}

	function onStatus ( e ) {
		if ( e.status == 'linked' ) setCurrent( 1 );
	}

	function onControl ( e ) {
		if ( e.type == 'swipeDown' ) setCurrent( 2 );
		$( '#test-swipe-result' ).attr( 'data-type', e.type );
	}

	function setCurrent ( i ) {
		if ( i > 0 ) zSteps.eq( i - 1 ).addClass( 'done' );
		zSteps.removeClass( 'current' )
			.eq( i ).removeClass( 'done' ).addClass( 'current' );
	}

	init();

})( Zepto );