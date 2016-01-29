'use strict';

var sanitizeHtml = require('sanitize-html');
var Entities = require('html-entities').AllHtmlEntities; 

var MessageModel = require('../../models/Message');
var CommentModel = require('../../models/Comment');

var Purest = require('purest'),
	reddit = new Purest({
		provider:'reddit',
		config:{
			'reddit': {
				'https://oauth.reddit.com': {
				  '__domain': {
					'auth': {
					  'auth': {'bearer': '[0]'}
					}
				  },
				  'message/{endpoint}': {
					'__path': {
					  'alias': 'messages'
					}
				  }
				}
			}
		},
		before:{
		all: function (endpoint, options) {
			options.headers = {'User-Agent': 'web:com.dignmg.redder:v1.0.0'};
		}
	  }
	});

var sanitize = function(html){
	var rawHtml = html.replace(/&lt;!--((?!--&gt;)[\s\S])*?--&gt;/g, '');
	var entities = new Entities();
	return entities.decode(rawHtml);
}

// t1_	Comment
// t2_	Account
// t3_	Link
// t4_	Message
// t5_	Subreddit
// t6_	Award
// t8_	PromoCampaign

var findKind = function(data){
	switch (data.kind) {
	  case 't1':
	    //Statements executed when the result of expression matches t1_
	    return TranslateCommentObject(data);
	    break;
	  case 't2':
	    //Statements executed when the result of expression matches t2
	    break;
	  case 't3':
	    //Statements executed when the result of expression matches t3
	    break;
	  case 't4':
	    //Statements executed when the result of expression matches t4
	    return TranslateMessageObject(data.data);
	    break;
	  case 't5':
	    //Statements executed when the result of expression matches t5
	    break;
	  case 't6':
	    //Statements executed when the result of expression matches t6
	    break;
	  case 't8':
	    //Statements executed when the result of expression matches t8
	    break;
	  default:
	    //Statements executed when none of the values match the value of the expression
	    break;
	}
};

var TranslateListingObject = function(response){
	var data = response.data;
	var children = data.children;
	return children.map(function(item){
		return findKind(item);
	});
};

var TranslateCommentObject = function(comment){
	var Comment = new CommentModel();
	var responseItem = comment.data;
	// console.log(responseItem);
	Comment.subject = responseItem.subject;
	Comment.body = responseItem.body;
	Comment.bodyHtml = sanitize(responseItem.body_html);
	Comment.name = responseItem.name;
	Comment.linkTitle = responseItem.link_title;
	Comment.created = responseItem.created;
	Comment.author = responseItem.author;
	Comment.subreddit = responseItem.subreddit;
	Comment.parentId = responseItem.parent_id;
	Comment.new = responseItem.new;
	Comment.replies = responseItem.replies;
	Comment.context = responseItem.context;
	/*  "body": "See the other comments in this thread. :)",
        "link_title": "running reddit bot",
        "was_comment": true,
        "first_message": null,
        "name": "t1_cyqm1l6",
        "first_message_name": null,
        "created": 1452292879,
        "dest": "dignmg",
        "author": "phil_s_stein",
        "created_utc": 1452264079,
        "body_html": "&lt;!-- SC_OFF --&gt;&lt;div class=\"md\"&gt;&lt;p&gt;See the other comments in this thread. :)&lt;/p&gt;\n&lt;/div&gt;&lt;!-- SC_ON --&gt;",
        "subreddit": "redditdev",
        "parent_id": "t1_cyqly2t",
        "likes": null,
        "context": "/r/redditdev/comments/3zc7m6/running_reddit_bot/cyqm1l6?context=3",
        "replies": "",
        "id": "cyqm1l6",
        "new": false,
        "distinguished": null,
        "subject": "comment reply" */
	return Comment;
};

var TranslateMessageObject = function(message){
	var Message = new MessageModel();
	Message.body = message.body;
	Message.bodyHtml = sanitize(message.body_html);
	Message.firstMessage = message.first_message;
	Message.firstMessageName = message.first_message_name;
	Message.name = message.name;
	Message.created = message.created;
	Message.dest = message.dest;
	Message.author = message.author;
	Message.parentId = message.parent_id;
	Message.context = message.context;
	Message.replies = message.replies;
	Message.id = message.id;
	Message.new = message.new;
	Message.subject = message.subject;
	/*	"body": "Just copy and paste from the old post and you'll be good to go!\n",
	    "was_comment": false,
	    "first_message": 262354799,
	    "name": "t4_4c96mt",
	    "first_message_name": "t4_4c769b",
	    "created": 1446180211,
	    "dest": "dignmg",
	    "author": "hamfast42",
	    "created_utc": 1446151411,
	    "body_html": "&lt;!-- SC_OFF --&gt;&lt;div class=\"md\"&gt;&lt;p&gt;Just copy and paste from the old post and you&amp;#39;ll be good to go!&lt;/p&gt;\n&lt;/div&gt;&lt;!-- SC_ON --&gt;",
	    "subreddit": null,
	    "parent_id": "t4_4c769b",
	    "context": "",
	    "replies": "",
	    "id": "4c96mt",
	    "new": false,
	    "distinguished": null,
	    "subject": "re: how do I repost" */
	return Message;
};

module.exports = function (router) {

    router.get('/', function (req, res) {
        
		console.log('messages');
        var sess = req.session;
		console.log(sess, 'sess');
		var code = null;
		if(typeof sess.userToken === 'undefined'){
			// res.redirect('/');
			// res.status(200).send(model);
			console.log('No Token');
		} else {
			code = sess.userToken.access_token;
			console.log(code, 'code');
			
			reddit.query('messages')
				.get('inbox')
				.auth(code)
				.request(function (err, callRes, body) {
					if (err) {
						// send error response
						res.status(500).send(err);
					} else if(body){
						// send transformed response
						res.status(200).send(TranslateListingObject(body));
						// res.status(200).send(body);
					} else {
						// send empty response
						res.status(204).end();
					}
				});
		}
        
    });

};
