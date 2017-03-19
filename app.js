var volleyball = require('volleyball')
var bodyParser = require('body-parser')
var nunjucks = require('nunjucks')
var express = require('express')
var db = require('./models').db
var wikiRouter = require('./routes/wiki.js');
const usersRouter = require('./routes/users.js')
var path = require('path');


var app = express()

var env = nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

app.use('/wiki', wikiRouter);
app.use('/users', usersRouter)

app.use(express.static(path.join(__dirname, '/public')));


db.sync()
.then(function(){
    var server = app.listen(1337, function() {
        console.log('listening on port 1337')
    })
})
.catch(console.error)

// app.use(function(err,req,res,next) {
//     //res.send(err.message)
// })