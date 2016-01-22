'use strict';

var LoginModel = require('../../models/Login');
var redis = require('redis'),
	client = redis.createClient();

module.exports = function (router) {

	var model = new LoginModel();

	router.get('/', function (req, res) {
		
		var sess = req.session;
		console.log(sess, 'sess');
		if(typeof sess.grant === 'undefined'){
			res.status(200).send(model);
		} else {
			sess.userToken = req.session.grant.response.raw;
			model.auth = true;
			res.send(model, null, 2);
		}
	})
};