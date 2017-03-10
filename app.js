var volleyball = require('volleyball')
var bodyParser = require('body-parser')
var nunjucks = require('nunjucks')
var express = require('express')
var models = require('./models')

var app = express()

var env = nunjucks.configure('views', {noCache: true});

app.set('view engine', 'html');
app.engine('html', nunjucks.render);


models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function(){
    var server = app.listen(1337, function() {
        console.log('listening on port 1337')
    })
})
.catch(console.error)
