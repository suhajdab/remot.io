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
 */

(function(){
	var rio = window.remot.io;

	var config;

	init = function () {
		//	detect presentation framework to select config profile
		config = defaults.config;
		attachListener();
	};

	function attachListener() {
		rio.socket.on( 'control', function ( data ) {
			console.log( data );
		});
	}

	var defaults = {
		config: ['window','keydown','up','right','down','left','return','esc']
	}

	init();

})();

var profiles = {

}