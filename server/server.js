var express = require('express')
    , http = require('http')
    , path = require('path')
    , mongoose = require('mongoose')
    , gzippo = require('gzippo')
//Routes
    , projectRoutes = require('./routes/projectRoutes')
    , socketInit = require('./routes/socketRoutes'); 

var app = express();
var server = app.listen(3000);
socketInit(server);


if ('test' == app.get('env')){
  // We should define a well known database :)
  mongoose.connect('mongodb://localhost/wolof-test');
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
} else {
  mongoose.connect('mongodb://localhost/wolof');
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
}

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
 
// development only
if ('production' == app.get('env')) {
    app.use('/', express.static(path.join(__dirname, '../dist')));
} else {
    app.use('/', express.static(path.join(__dirname, '../app')));
    app.use(express.errorHandler());
}

app.get('/api/projects', projectRoutes.get);

app.get('/api/projects/:id(\\d+)', projectRoutes.getById);

app.get('/api/projects/:name', projectRoutes.getByName);

app.post('/api/projects', projectRoutes.post);

app.put('/api/projects/:projectId', projectRoutes.put);

app.delete('/api/projects/:projectId', projectRoutes.delete);

//For grunt
exports = module.exports = app;
exports.use = function() {
  app.use.apply(app, arguments);
};