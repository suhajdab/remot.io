(function () {
	'use strict'

	function getData () {
		var str = localStorage.getItem( prefix + '-data' );
		return JSON.parse(str) || {};
	}

	function setData () {
		var str = JSON.stringify( rio.data );
		localStorage.removeItem( prefix + '-data' );
		localStorage.setItem( prefix + '-data', str );
	}

	remot.io.storage = {
		get: getData,
		set: setData
	};
})();