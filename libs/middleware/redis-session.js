'use strict';

var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redis = require('redis');

module.exports = function (settings, redisConfig) {
	var url = process.env.REDIS_URL || redisConfig.url;
	console.log(url);
	// var client = redis.createClient({port: redisConfig.port, host: redisConfig.host, password: redisConfig.password});
	var client = redis.createClient(url);
	client.auth(redisConfig.password);

	redisConfig.client = client;
    settings.store = new RedisStore(redisConfig);
    return session(settings);
};