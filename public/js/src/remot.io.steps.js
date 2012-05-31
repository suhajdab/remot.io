/**
 * This function guides the user through the steps of getting remot.io controlling ready to roll
 */

( function ( $ ) {
	'use strict'

	var zSteps = $( 'section' );

	function init () {
		remot.io.socket.on( 'connect', onConnect );
		remot.io.socket.on( 'status', onStatus );
		remot.io.socket.on( 'control', onControl );
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
	}
	/**
	 * 
	 * @param  {[type]} e [description]
	 * @return {[type]}   [description]
	 */
	function onControl ( e ) {
		if ( e.type == 'swipeDown' ) setCurrent( 2 );
		$( '#test-swipe-result' ).attr( 'data-type', e.type );
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