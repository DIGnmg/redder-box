import { combineReducers } from 'redux';
import user from './user';
import subreddits from './subreddits';
import messages from './messages';
import comments from './comments';

const reducers = {
	user: user,
	subreddits: subreddits,
	messages: messages,
	comments: comments
}

export default combineReducers(reducers);