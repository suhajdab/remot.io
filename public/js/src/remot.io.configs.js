/**
 *
 *
 * keyCodes for reference
 * 	up: 		38,
 * 	down: 	40,
 * 	left: 	37,
 * 	right: 	39,
 * 	space: 	32,
 * 	pgup: 	33,
 * 	pgdown: 34,
 * 	tab: 		 9,
 * 	esc: 		27,
 * 	enter: 	13
 */

remot.io.profiles = 
[
	{
		name: 'revealjs',
		detector: function() { return ( window.Reveal && window.Reveal.toggleOverview ); },
		config: {
			eventTarget: 	'document',
			eventType: 		'keyup',
			swipeUp: 			function() {
				Reveal.navigateDown();
			},
			swipeDown: 		function() {
				Reveal.navigateUp();
			},
			swipeLeft: 		function() {
				Reveal.navigateRight();
			},
			swipeRight: 	function() {
				Reveal.navigateLeft();
			},
			pinch: 				function() {
				Reveal.toggleOverview();
			},
			zoom: 				function() {
				Reveal.toggleOverview();
			}
		}
	},
	{
		// 
		name: 'default',
		detector: function() { return true; },
		config: {
			eventTarget: 	document,
			eventType: 		'keyup',
			swipeUp: 			38,
			swipeDown: 		40,
			swipeLeft: 		39,
			swipeRight: 	37,
			pinch: 				27,
			zoom: 				13
		}
	}
];