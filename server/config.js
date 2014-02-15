var path = require('path');
var config = [];

config["development"] = {
	connectionString : 'mongodb://localhost/wolof',
	staticFiles : path.join(__dirname, '../app'),
	PORT : process.env.PORT || 3000
};

config["testing"] = {
	connectionString : 'mongodb://localhost/wolof-test',
	staticFiles : path.join(__dirname, '../app'),
	PORT : process.env.PORT || 3000
};

config["Production"] = {
	connectionString : 'mongodb://wolof:Passw0rd!@troup.mongohq.com:10099/wolof',
	staticFiles : path.join(__dirname, '../dist'),
	PORT : process.env.PORT || 3000
};



module.exports = config;