'use strict';

module.exports = function SubreddditPostModel() {
    return {
    	id: 0,
        name: 'SubreddditPost',
        title: 'Title',
        author: 'Author',
        clicked: false,
		visited: false,
       	score: 0,
		ups: 0,
		subreddit: 'subreddit'
    };
};
