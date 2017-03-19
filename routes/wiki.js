const express = require('express');
const router = express.Router();
const Promise = require('bluebird')
const models = require('../models');
var Page = models.Page; 
var User = models.User; 


//var client = require('../db');

router.get('/', function(req, res, next){
	return Page.findAll({})
	.then(function(allPages) {
			res.render('index', {pages: allPages})
		})
	.catch(next)
});

router.post('/', function(req, res, next) {
	User.findOrCreate({
            where: {
                name: req.body.name,
                email: req.body.email
            }
        })
        .spread(function(user, createdPageBool) {
            return Page.create({
				title: req.body.title,
				content: req.body.content,
				status: req.body.status
			}).then(function(page) {
				return page.setAuthor(user)
			})
		})
		.then(function (page) {
				res.redirect(page.route)
        })
		.catch(next);
})

router.get('/add', function(req, res, next){
	res.render('addpage')
});

router.get('/:url', function(req, res, next){
	var url = req.params.url;
	Page.findOne({
		where: {
			urlTitle: url
		}, include : [
			{model: User, as: 'author'}
		]
	})
	.then(function(page){
		if (!page) {
			return next(new Error('That page was not found'))
		}
		res.render('wikipage',{
			page: page,
			title: page.title,
			content: page.content
		});
	})
	.catch(next);
});

module.exports = router;