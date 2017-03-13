const express = require('express');
const router = express.Router();
const models = require('../models');
var Page = models.Page; 
var User = models.User; 


//var client = require('../db');

router.get('/', function(req, res, next){
	return Page.findAll({})
	.then(function(allPages) {
		var pagesArr = allPages.map(function(elem) {
			return {
				title: elem.dataValues.title,
				urlTitle: elem.dataValues.urlTitle
			}
		})
		// console.log(allPages[0].dataValues)
		res.render('index', {pages: pagesArr})
	})
	
	
	
	res.send('In Get /')
	//res.redirect('/');
	next();
});

router.post('/', function(req, res, next) {
//adding pages and users together isn't working yet
	return User.findOne({
		where: {
			name: req.body.name,
			email: req.body.email
		}
	}).then(function(userToAdd) {
		if(!userToAdd) {
			var user = User.build({
				name: req.body.name,
				email: req.body.email
			})
			user.save()
			userToAdd = user;
		}
		return userToAdd 
	}).then(function(userToAdd) {
		var page = Page.build({
    		title: req.body.title,
    		content: req.body.content,
			authorId: userToAdd.id
  		})
		return page.save()
	}).then(function(savedPage){
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