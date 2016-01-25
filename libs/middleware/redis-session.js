'use strict';

var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redis = require('redis');

module.exports = function (settings, redisConfig) {
	console.log(settings.port, settings.host);
	var client = redis.createClient(settings.port, settings.host);
    // var client = redis.createClient(process.env.REDIS_URL);
	redisConfig.client = client;
    settings.store = new RedisStore(redisConfig);
    return session(settings);
};