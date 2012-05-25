/**
 * [ description]
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */

/* 	TODO: seperate, cleanup
	TODO: bootstrap modal plugin?
*/
( function ( $ ) {
	'use strict'


	var overlay;

	function buildqr ( el ) {
		var url = el.href,
			dataurl = showQRCode( url );

		overlay = $( '<div id="overlay">' )
			.css( 'background-image', 'url(' + dataurl + ')' )
			.appendTo( 'body' );
	}

	function onClickDoc ( e ) {
		e.preventDefault();
		closeOverlay();
	}

	function onKeydownDoc ( e ) {
		if ( e.keyCode == 27 ) {
			e.preventDefault();
			closeOverlay();
		}
	}

	function closeOverlay() {
		$( document )
			.off( 'click', onClickDoc )
			.off( 'keydown', onKeydownDoc );
		if ( overlay ) overlay.removeClass( 'show' );
	}

	function onClick ( e ) {
		e.preventDefault();
		e.stopPropagation();
		if ( !overlay ) buildqr( this );
		setTimeout(function() {
			overlay.addClass( 'show' );
		},1);
		$( document )
			.on( 'click', onClickDoc )
			.on( 'keydown', onKeydownDoc );
	}

	$( '.js-qrcode' )
		.on( 'click', onClick );

})( Zepto );