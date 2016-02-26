'use strict';
var CommentModel = require('../../models/Comment');
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
				  "{endpoint}": {
					"__path": {
					  "alias": "article"
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

var CommentHeader = function(data){
	var _header = data.data.children[0].data;

	return {
		author: _header.author,
		approvedBy : _header.approved_by,
		created : _header.created,
		createdUtc : _header.created_utc,
		domain : _header.domain,
		downs : _header.downs,
		edited : _header.edited,
		id : _header.id,
		isSelf : _header.is_self,
		likes : _header.likes,
		name : _header.name,
		numComments : _header.num_comments,
		numReports : _header.num_reports,
		permalink : _header.permalink,
		saved : _header.saved,
		score : _header.score,
		selftext : _header.selftext,
		selftextHtml : _header.selftext_html,
		stickied : _header.stickied,
		subreddit : _header.subreddit,
		subredditId : _header.subreddit_id,
		title : _header.title,
		ups : _header.ups,
		upvote_ratio : _header.upvote_ratio,
		url : _header.url,
		visited : _header.visited
	}

}

var CommentContent = function(data){
	var array = [],
		newArray = [];

	if(data != null){
		array = data.data.children;
	}
	if(array.length){
		newArray = array.map(function(item){
			var model = new CommentModel();
			var responseItem = item.data;

			model.approvedBy = responseItem.approved_by;
			model.archived = responseItem.archived;
			model.author = responseItem.author;
			model.authorFlair_css_class = responseItem.author_flair_css_class;
			model.authorFlair_text = responseItem.author_flair_text;
			model.bannedBy = responseItem.banned_by;
			model.body = responseItem.body;
			model.bodyHtml = responseItem.body_html;
			model.controversiality = responseItem.controversiality;
			model.created = responseItem.created;
			model.createdUtc = responseItem.created_utc;
			model.distinguished = responseItem.distinguished;
			model.downs = responseItem.downs;
			model.edited = responseItem.edited;
			model.gilded = responseItem.gilded;
			model.id = responseItem.id;
			model.likes = responseItem.likes;
			model.linkId = responseItem.link_id;
			model.modReports = responseItem.mod_reports;
			model.name = responseItem.name;
			model.numReports = responseItem.num_reports;
			model.parentId = responseItem.parent_id;
			model.removalReason = responseItem.removal_reason;
			model.replies = responseItem.replies;
			model.reportReasons = responseItem.report_reasons;
			model.saved = responseItem.saved;
			model.score = responseItem.score;
			model.scoreHidden = responseItem.score_hidden;
			model.stickied = responseItem.stickied;
			model.subreddit = responseItem.subreddit;
			model.subredditId = responseItem.subreddit_id;
			model.ups = responseItem.ups;
			model.userReports = responseItem.user_reports;
			return model;
		})
		return newArray;
	}
}

var TransalteSubredditCommentObject = function (data){
	var array = [],
		newArray = [],
		comments = [],
		header = {};
	
	if(data != null){
		header = CommentHeader(data[0]);
		comments = CommentContent(data[1])
	}
	return {
		header: header,
		comments: comments
	}

}

module.exports = function (router) {

    router.get('/', function (req, res) {
		
		var sess = req.session;
		var code = null;
		var url = null;
		var article = null;
		var redditurl = null;

		if(sess.userToken == null){
			console.log('redirect');
			res.redirect('/');
		} else {
			code = sess.userToken.access_token;
			article = req.query.id;
			redditurl = req.query.subreddit;
			url = 'r/' + redditurl + '/comments/' + article;
			console.log(url, 'url');
			
			reddit.query('article')
				.get(url)
				.auth(code)
				.request(function (err, callRes, body) {
					if (err) {
						// send error response
						res.status(500).send(err);
					} else if(body){
						// send transformed response
						res.status(200).send(TransalteSubredditCommentObject(body));
						// res.status(200).send(body);
					} else {
						// send empty response
						res.status(204).end();
					}
				});
		}
	});

};