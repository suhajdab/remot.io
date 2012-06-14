descr = 'your html presentation simply deserves an html remote';
title = 'remot.io';
version = '0.8';
googleUA = 'UA-207925-20';

exports.index = function(req, res){
	res.render( 'index', {
		layout: 'default-layout',
		uid: Math.uuid( 5 ),
		host: req.headers.host
	});
};

exports.controller = function(req, res){
	res.render( 'controller', { 
		layout: 'controller-layout',
		title: 'remot.io',
		uid: req.params.uid
	})
};

exports.bookmarklet = function(req, res){
	res.render('bookmarklet', { 
		uid: req.params.uid,
		layout: false
	});
};