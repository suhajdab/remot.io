/**
 * This function guides the user through the steps of getting remot.io controlling ready to roll
 */

( function ( $ ) {
	'use strict'

	var zSteps = $( 'section' ), timeout;

	function init () {
		remot.io.socket.on( 'connect', onConnect );
		remot.io.socket.on( 'status', onStatus );
		remot.io.socket.on( 'control', onControl );
		zSteps.eq( 2 ).find('.bookmarklet').on( 'drag', onDrag );
	}

	/**
	 * Function called when io socket connection is established setting the 1st step in the guide as current
	 */
	function onConnect () {
		setCurrent( 0 );
	}

	/**
	 * Function handling a custom socket event: status change
	 *  when a controller with same id is connected to server, advance guide to step 2
	 * @param  {Object} e Object containing changed status
	 */
	function onStatus ( e ) {
		if ( e.status == 'linked' ) setCurrent( 1 );
		$( document ).trigger( 'click' ); // trigger closing of qr overlay
	}
	/**
	 * Function handling custom socket event: control
	 *  Event is triggered on predefined interactions on controlling device
	 * @param  {Object} e Data sent with socketio
	 */
	function onControl ( e ) {
		if ( e.type == 'swipeDown' ) setCurrent( 2 );
		$( '#test-swipe-result' ).attr( 'data-type', e.type );
	}

	/**
	 * Event handler for dragging the bookmarklet
	 *   Can't detect actually adding bookmarklet to bookmarks bar, so fake it :)
	 * @param  {Object} e Event object
	 */
	function onDrag ( e ) {
		clearTimeout( timeout );
		setTimeout( function() {
			setCurrent( 3 );
		}, 2000 );
	}

	/**
	 * Function sets .current on current step in guide
	 *  and .done on previous step
	 *  
	 * @param {Number} i zero indexed step number
	 */
	function setCurrent ( i ) {
		if ( i > 0 ) zSteps.eq( i - 1 ).addClass( 'done' );
		zSteps.removeClass( 'current' )
			.eq( i ).removeClass( 'done' ).addClass( 'current' );

		if ( i === 0 ) {
			zSteps.eq( 0 ).find( 'input' ).focus().select();
		} else {
			zSteps.eq( 0 ).find( 'input' ).blur();
		}
	}

	init();

})( Zepto );