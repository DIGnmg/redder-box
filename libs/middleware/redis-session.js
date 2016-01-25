'use strict';

var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redis = require('redis');

module.exports = function (settings, redisConfig) {
	console.log(redisConfig, "redisConfig");
	console.log(process.env.REDIS_URL, "REDIS_URL");
	// var client = redis.createClient({port: redisConfig.port, host: redisConfig.host, password: redisConfig.password});
	var client = require('redis').createClient(process.env.REDIS_URL);
	redisConfig.client = client;
    settings.store = new RedisStore(redisConfig);
    return session(settings);
};