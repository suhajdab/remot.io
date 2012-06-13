/**
	TODO: robost cross browser keyup/keydown triggering
  TODO: error handling when not connected for long period
  TODO: make sure receiver doesnt init multiple times when user clicks bookmarklet again

  further reading on keyboard event triggers:
   - http://help.dottoro.com/ljbwbehw.php
*/


( function ( $ ) {
	'use strict'
	
	var config;

	function init () {
		//	detect presentation framework to select config profile
		for ( var i = 0, p; p = remot.io.profiles[ i ]; i++ ) {
			if ( p.detector && p.detector() ) {
				config = p.config;
				console.log( 'using ' + p.name + ' profile' );
				break;
			}
		}
		attachListener();
	};

	function attachListener() {
		remot.io.socket.on( 'control', onControl );
	}

	function onControl ( e ) {
		trigger( e.type );
		controlFeedback( e.type );
	}

	function controlFeedback( type ) {
		document.body.dataset.eventType = type;
	}

	function trigger ( type ) {
		console.log(config, type, config[ type ]);
		if ( typeof config[ type ] == 'number' ) {
			remot.io.trigger( config.eventTarget, config.eventType, config[ type ] );
		} else if ( typeof config[ type ] == 'function' ) {
			config[ type ]();
		}
	}

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