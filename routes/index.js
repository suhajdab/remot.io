
/*
 * GET home page.
 */

var descr = 'remot.io - a free, simple remote for your html presentations',
	title = 'remot.io'
	googleUA = 'UA-207925-20';

exports.index = function(req, res){
	console.log(req);
	res.render( 'index', {
		layout: 'default-layout',
		title: title, 
		descr: descr,
		uid: Math.uuid( 5 ),
		host: req.headers.host
	});
};

exports.controller = function(req, res){
	//console.log(req.route.params);
	res.render( 'controller', { 
		layout: 'controller-layout',
		title: 'remot.io',
		descr: descr,
		uid: req.params.uid
	})
};

exports.bookmarklet = function(req, res){
	res.render('bookmarklet', { 
		uid: req.params.uid,
		layout: false
	});
};