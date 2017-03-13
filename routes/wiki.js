const express = require('express');
const route = express.Router();


//var client = require('../db');

route.get('/', function(req, res, next){
	//res.send('In Get /')
	res.redirect('/');
	next();
});

route.post('/', function(req, res, next){
	//res.send('In post /');
	console.log(req.body);
	res.json(req.body);


});

route.get('/add', function(req, res, next){
	//res.send('in get /add');
	res.render('addpage')
});

module.exports = route;