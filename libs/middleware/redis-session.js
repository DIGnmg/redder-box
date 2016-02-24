'use strict';

var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redis = require('redis');
// Or you can specify a URL 
// var redis = require('redis-url');

module.exports = function (settings, redisConfig) {
	var url = process.env.REDIS_URL || redisConfig.url;
	// var url = redisConfig.url;
	var redisOptions = {
		port: redisConfig.port, 
		host: redisConfig.host, 
		password: redisConfig.password
	};
	// Or you can specify a URL 
    // var client = redis.connect(url);
	var client = redis.createClient(url, redisOptions);
	// var client = redis.createClient(url);
	// client.auth(redisConfig.password);

	redisConfig.client = client;
    settings.store = new RedisStore(redisConfig);
    return session(settings);
};