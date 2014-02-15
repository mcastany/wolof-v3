var express = require('express')
    , http = require('http')
    , config = require('./config')
    , mongoose = require('mongoose')
    , gzippo = require('gzippo')
//Routes
    , projectRoutes = require('./routes/projectRoutes')
    , socketInit = require('./routes/socketRoutes'); 

var app = express();
var env = app.get('env');
console.log("Environment: " + env);
console.log("Port: " + config[env].PORT);

mongoose.connect(config[env].connectionString);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

var server = app.listen(config[env].PORT);
socketInit(server);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use('/', express.static(config[env].staticFiles)); 

if ('production' != env) {
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