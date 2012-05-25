/*
	TODO: place configs & keyCodes is seperate module
	TODO: config by object, instead of array & use extend to merge custom with defaults
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
		var ev = $.Event( config[ 1 ] );
		switch( type ) {
			case 'swipeUp':
				ev.which = keyCodes[config[2]];
				break;
			case 'swipeDown':
				ev.which = keyCodes[config[3]];
				break;
			case 'swipeLeft':
				ev.which = keyCodes[config[4]];
				break;
			case 'swipeRight':
				ev.which = keyCodes[config[5]];
				break;
		}

		$( config[ 0 ] ).trigger( ev );
		console.log( ev );
	}

	var defaults = {
		config: ['document','keydown','up','down','left','right','return','esc']
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

firing keyboard events
$.each([85,83,69,32,83,84,82,73,67,84],function(i,keyCode){
  e=document.createEvent("KeyboardEvent");
  e.initKeyEvent("keydown",true,true,window,false,false,false,false,keyCode,0);
  e.synthetic=true;
  document.dispatchEvent(e);
});

*/