/**
	TODO: place configs & keyCodes is seperate module
	TODO: config by object, instead of array & use extend to merge custom with defaults
	TODO: robost cross browser keyup/keydown triggering
*/


( function ( $ ) {
	'use strict'
	
	var config;

	function init () {
		//	detect presentation framework to select config profile
		config = defaults.config;
		attachListener();
	};

	function attachListener() {
		remot.io.socket.on( 'connect', onConnect );
		remot.io.socket.on( 'control', onControl );
	}

	function onControl ( e ) {
		trigger( e.type );
		controlFeedback( e.type );
	}

	function onConnect ( e ) {
		sendUid();
	}

	function controlFeedback( type ) {
		document.body.dataset.eventType = type;
	}

	function sendUid() {
		remot.io.socket.emit( 'uid', { uid: remot.io.uid });
	}

	function trigger ( type ) {
		var ev, keyCode;
		switch( type ) {
			case 'swipeUp':
				keyCode = keyCodes[config[2]];
				break;
			case 'swipeDown':
				keyCode = keyCodes[config[3]];
				break;
			case 'swipeLeft':
				keyCode = keyCodes[config[4]];
				break;
			case 'swipeRight':
				keyCode = keyCodes[config[5]];
				break;
		}


		ev = document.createEvent( 'KeyboardEvent' );
		Object.defineProperty( ev, 'keyCode', {
			get: function(){
				return this.keyCodeVal;
			}
		});
		Object.defineProperty( ev, 'which', {
			get: function(){
				return this.keyCodeVal;
			}
		});
		ev.initKeyboardEvent( config[ 1 ], true, false, null, 0, false, 0, false, keyCode, 0 );
		ev.keyCodeVal = keyCode;
		document.dispatchEvent( ev );

		console.log( e );
	}

	var defaults = {
		config: ['document','keyup','down','up','right','left','return','esc']
	}

	var keyCodes = {
		'up'	:38,
		'down'	:40,
		'left'	:37,
		'right'	:39,
		'space'	:32,
		'pgup'	:33,
		'pgdown':34,
		'tab'	:9,
		'esc'	:27
	};

	init();

})( Zepto );

var profiles = {

}

/*
impressjs keyboard listeners
document.addEventListener("keyup", function ( event ) {
            if ( event.keyCode === 9 || ( event.keyCode >= 32 && event.keyCode <= 34 ) || (event.keyCode >= 37 && event.keyCode <= 40) ) {
                switch( event.keyCode ) {
                    case 33: // pg up
                    case 37: // left
                    case 38: // up
                             api.prev();
                             break;
                    case 9:  // tab
                    case 32: // space
                    case 34: // pg down
                    case 39: // right
                    case 40: // down

firing keyboard events without Zepto
$.each([85,83,69,32,83,84,82,73,67,84],function(i,keyCode){
  e=document.createEvent("KeyboardEvent");
  e.initKeyEvent("keydown",true,true,window,false,false,false,false,keyCode,0);
  e.synthetic=true;
  document.dispatchEvent(e);
});
*/