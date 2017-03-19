const express = require('express')
const router = express.Router()
module.exports = router;
const Promise = require('bluebird')
const models = require('../models');
var Page = models.Page; 
var User = models.User;

router.get('/', function(req, res, next) {
    User.findAll()
    .then(function(users) {
        res.render('userlist', {users: users})
    }).catch(next)
})

router.get('/:id', function(req, res, next) {
    var userQuery = User.findById(req.params.id)
    var pagesQuery = Page.findAll({
        where: {
            authorId: req.params.id
        }
    })
    Promise.all([userQuery, pagesQuery])
    .spread(function(user, pages) {
        res.render('userpages', {
            user: user,
            pages: pages
        })
    })
})

