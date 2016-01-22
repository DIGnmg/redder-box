'use strict';

var SubredditPost = require('../../../models/SubredditPost');
var Purest = require('purest'),
	reddit = new Purest({
		provider:'reddit',
		config:{
			"reddit": {
				"https://oauth.reddit.com": {
				  "__domain": {
					"auth": {
					  "auth": {"bearer": "[0]"}
					}
				  },
				  "r/{endpoint}/new": {
					"__path": {
					  "alias": "new"
					}
				  }
				}
			}
		},
		before:{
		all: function (endpoint, options, config) {
			options.headers = {"User-Agent": "web:com.dignmg.redder:v1.0.0"};
		}
	  }
	})

var SubredditPostDto = function (data){
	var array = [],
		newArray = [];
	
	if(data != null){
		console.log(data, 'data');
		array = data.data.children;
	}
	if(array.length){
		newArray = array.map(function(item){
			var model = new SubredditPost();
			var responseItem = item.data;
			model.name = responseItem.name;
			model.title = responseItem.title;
			model.author = responseItem.author;
			model.clicked = responseItem.clicked;
			model.visited = responseItem.visited;
			model.score = responseItem.score;
			model.ups = responseItem.ups;
			model.id = responseItem.id;
			model.subreddit = responseItem.subreddit;
			return model;
		})
		return newArray;
	}

}

module.exports = function (router) {

	router.get('/', function (req, res) {
		
		var sess = req.session;
		console.log('new', sess);
		var code = null;
		var url = null;
		if(sess.userToken == null){
			console.log('redirect');
			res.redirect('/');
		} else {
			code = sess.userToken.access_token;
			url = req.query.url;
			console.log(url, 'url');
			
			reddit.query('new')
				.get(url)
				.auth(code)
				.request(function (err, callRes, body) {
					if (err) {
						// send error response
						res.status(500).send(err);
					} else if(body){
						// send transformed response
						// res.status(200).send(body);
						res.status(200).send(SubredditPostDto(body));
					} else {
						// send empty response
						res.status(204).end();
					}
				});
		}
	});
};