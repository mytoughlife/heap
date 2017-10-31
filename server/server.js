
require('dotenv').config();


var restify = require('restify');
var logger = require('morgan');

var notifier = require('./activityNotifier.js');

// set up server
var server = restify.createServer();
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(logger('dev'));


var accessor = require('./itemsAccessor.js');

server.get('/api/items/', function(req, res) {
    accessor.getAll({status: 'active'}, function(err, data){
        if (err) throw err;
        res.send(data);
    })
});

server.get('/api/archivedItems/', function(req, res) {
    accessor.getAll({status: 'archived'}, function(err, data){
        if (err) throw err;
        res.send(data);
    })
});

server.get('/api/items/:id', function(req, res) {
    accessor.get(req.params.id, function(err, data){
        if (err) throw err;
        if (!data) data = {};
        res.send(data);
    })
});

server.post('/api/items/', function(req, res) {
    accessor.create(req.body, function(err, data){
        if (err) throw err;

        notifier.Notify('create', data, function(){
            res.send(201, data);
        });
    })
});

server.put('/api/items/:id', function(req, res) {
    accessor.update(req.params.id, req.body, function(err, data){
        if (err) throw err;

        notifier.Notify('update', data, function(){
            res.send(data);
        });
    })
});

server.del('/api/items/:id', function(req, res) {
    accessor.delete(req.params.id, function(err, data){
        if (err) throw err;

        notifier.Notify('delete', req.params.id, function(){
            res.end();
        });
    })
});

server.get(/.*/, restify.serveStatic({
	directory: './public',
	default: 'index.html',
    maxAge: 0
}));


// Start the app by listening on <port>
var port =  process.env.PORT || 3000;
server.listen(port);
console.log('App started on port ' + port);
