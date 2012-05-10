/**

 */

(function(){
	var rio = {}, socket;

	var prefix = 'remotio';

	if (!io) throw ('socketio not found');
	rio.socket = io.connect( '//' + location.host  );

	function getData () {
		var str = localStorage.getItem( prefix + '-data' );
		return JSON.parse(str);
	}

	function setData () {
		var str = JSON.stringify( rio.data );
		localStorage.removeItem( prefix + '-data' );
		localStorage.setItem( prefix + '-data', str );
	}

	rio.data = getData();

	window.remot = {
		io: rio
	}
})();