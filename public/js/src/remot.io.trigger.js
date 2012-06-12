/*
 * TODO: consider renaming
 */

remot.io.trigger = function ( target, type, keyCode ) {
	'use strict'

	var ev = document.createEvent( 'KeyboardEvent' );
	
	try {
		Object.defineProperty( ev, 'keyCode', {
			get: function() {
				return this.keyCodeVal;
			}
		});
		Object.defineProperty( ev, 'which', {
			get: function() {
				return this.keyCodeVal;
			}
		});
	} catch ( e ) {}

	if ( ev.initKeyboardEvent ) {
      ev.initKeyboardEvent( type, true, true, document.defaultView, false, false, false, false, keyCode, keyCode );
  } else {
      ev.initKeyEvent( type, true, true, document.defaultView, false, false, false, false, keyCode, keyCode );
  }

	ev.keyCodeVal = keyCode;
	target.dispatchEvent( ev );
}