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
	page.save()
	.then(function(savedPage){
		res.redirect(savedPage.route); 
	})
	
});

router.get('/add', function(req, res, next){
	//res.send('in get /add');
	res.render('addpage')
});

router.get('/:page', function(req, res, next){
	var page = req.params.page;
	return Page.findAll({
		where: {
			urlTitle: page
		}
	})
	.then(function(retPage){
		res.render('wikipage',{
			title: retPage[0].title,
			content: retPage[0].content
		});
	})
	.catch(next);


	//res.render('wikipage');

});

module.exports = router;