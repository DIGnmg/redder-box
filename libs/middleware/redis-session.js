'use strict';

var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redis = require('redis');

module.exports = function (settings, redisConfig) {
	var client = redis.createClient(settings.port, settings.host);
	redisConfig.client = client;
    settings.store = new RedisStore(redisConfig);
    return session(settings);
};