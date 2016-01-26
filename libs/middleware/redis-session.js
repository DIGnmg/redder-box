'use strict';

var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redis = require('redis');

module.exports = function (settings, redisConfig) {
	console.log(redisConfig);
	// var url = process.env.REDIS_URL || 'redis://localhost:6379/0';
	// var client = redis.createClient({port: redisConfig.port, host: redisConfig.host, password: redisConfig.password});
	var client = redis.createClient(redisConfig.url);
	redisConfig.client = client;
    settings.store = new RedisStore(redisConfig);
    return session(settings);
};