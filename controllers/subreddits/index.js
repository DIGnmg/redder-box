'use strict';

var SubredditModel = require('../../models/Subreddit');
// var redditProvider = require('../../config/reddit-provider.json');

var Writable = require('stream').Writable;
var Readable = require('stream').Readable;
var Duplex = require('stream').Duplex;

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
				  "api/[version]/{endpoint}": {
					"__path": {
					  "alias": "__default",
					  "version": "v1"
					}
				  },
				  "subreddits/mine/{endpoint}": {
					"__path": {
					  "alias": "subreddits"
					}
				  },
				  "{endpoint}/new": {
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

var TranslateSubredditObject = function (data){
	var array = [],
		newArray = [];
	
	if(data != null){
		console.log(data, 'data');
		array = data.data.children;
	}
	if(array.length){
		newArray = array.map(function(item){
			var model = new SubredditModel();
			var responseItem = item.data;
			model.displayName = responseItem.display_name;
			model.name = responseItem.name;
			model.title = responseItem.title;
			model.url = responseItem.url;
			return model;
		})
		return newArray;
	}

}

function createWritable(write, config) {
  var stream = new Duplex(config);
  stream._write = write || function noop(a, b, done) { done(); };
  return stream;
}
// then you can, for example:
var stdout = createWritable(function (chunk, encoding, done) {
  console.log(chunk);
  done();
});

module.exports = function (router) {

	router.get('/', function (req, res) {
		
		var sess = req.session;
		console.log(sess, 'sess');
		var code = null;
		if(sess.userToken == null){
			console.log('redirect');
			res.redirect('/');
		} else {
			code = sess.userToken.access_token;
			console.log(code, 'code');
			
			reddit.query('subreddits')
				.get('subscriber')
				.where({show:'all'})
				.where({limit:100})
				.auth(code)
				.request(function (err, callRes, body) {
					if (err) {
						// send error response
						res.status(500).send(err);
					} else if(body){
						// send transformed response
						// res.status(200).send(TranslateSubredditObject(body));
						res.status(200).send(body);
					} else {
						// send empty response
						res.status(204).end();
					}
				});
		}
	});
};
