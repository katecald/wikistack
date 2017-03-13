const express = require('express');
const router = express.Router();
const models = require('../models');
var Page = models.Page; 
var User = models.User; 


//var client = require('../db');

router.get('/', function(req, res, next){
	res.send('In Get /')
	//res.redirect('/');
	next();
});

router.post('/', function(req, res, next) {
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  })
	page.save();
	res.json(page); 
});

router.get('/add', function(req, res, next){
	//res.send('in get /add');
	res.render('addpage')
});

module.exports = router;