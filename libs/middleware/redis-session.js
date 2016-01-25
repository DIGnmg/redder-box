'use strict';

var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redis = require('redis');

module.exports = function (settings, redisConfig) {
	console.log(redisConfig, "redisConfig");
	var client = redis.createClient(redisConfig.url);
	redisConfig.client = client;
    settings.store = new RedisStore(redisConfig);
    return session(settings);
};