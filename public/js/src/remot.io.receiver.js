/**
 * TODO: allow simple config on client side
 * TODO: save config to location.hash
 * TODO: fire keyup or keydown on 'left arrow', 'k' and 'a' for swipe right... etc ( customizable )
 * TODO: allow user to switch between locally saved 'profiles'
 * TODO: config profiles as [element selector,eventtype,swipe-up,swipe-down,swipe-left,swipe-right,zoomin,zoomout]
 * TODO: allow configuration by key press in input field
 * TODO: copy config as JSON string from input
 * TODO: configure by pasting hash JSON string with to url -> save config to localstorage -> remove from hash -> display notification (ex: config save in connection to current url)
 * TODO: detect hashchange and restore previous hash if config detected
 * TODO: **** BOOKMARKLET! ****
 * TODO: timeout if no controller after 30s
 * TODO: use shorter event types for transport
 * TODO: replace Zepto with purpose coded js
 * TODO: ender.node.de for javascript framework optimisation
 * TODO: only load qrcode bits when needed	
 */

(function($){
	var rio = window.remot.io;

	var config;

	init = function () {
		if (!io) throw ( 'socketio not found' );
		rio.socket = io.connect( '//' + location.host + '/receiver' );
		//	detect presentation framework to select config profile
		config = defaults.config;
		attachListener();
	};

	function attachListener() {
		rio.socket.on( 'control', onControl );
	}

	function onControl ( d ) {
		var e = $.Event( config[ 1 ] );
		switch( d.type ) {
			case 'swipeUp':
				e.which = keyCodes[config[2]];
				break;
			case 'swipeDown':
				e.which = keyCodes[config[3]];
				break;
			case 'swipeLeft':
				e.which = keyCodes[config[4]];
				break;
			case 'swipeRight':
				e.which = keyCodes[config[5]];
				break;
		}

		$( config[ 0 ] ).trigger( e );
		console.log( e );
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

})( Zepto);

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