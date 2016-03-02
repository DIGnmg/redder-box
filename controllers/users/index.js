'use strict';

var UserModel = require('../../models/User');
var qs = require('querystring');

var Purest = require('purest'),
	reddit = new Purest({
		provider:'reddit',
		before:{
		all: function (endpoint, options, config) {
			options.headers = {'User-Agent': 'web:com.dignmg.redder:v1.0.0'};
		}
	  }
	});

// t1_	Comment
// t2_	Account
// t3_	Link
// t4_	Message
// t5_	Subreddit
// t6_	Award
// t8_	PromoCampaign

var TranslateMeDtoObject = function (data){

	if(data !== null){
		var model = new UserModel();
		var responseItem = data;
		model.name = responseItem.name;
		console.log(model);
		return model;
	}
};

module.exports = function (router) {
	router.get('/', function (req, res) {

		var sess = req.session;
		var code = null;
		if(typeof sess.userToken === 'undefined'){
			res.redirect('/');
		} else {
			
			code = sess.userToken.access_token;
			console.log(code, 'code');

			reddit.query('auth')
				.get('me')
				.auth(code)
				.request(function (err, callRes, body) {
					if (err) {
						// send error response
						res.status(500).send(err);
					} else if(body){
						// send transformed response
						// res.status(200).send(TranslateMeDtoObject(body));
						res.status(200).send(body);
					} else {
						// send empty response
						res.status(204).end();
					}
				});
		}
	});
};