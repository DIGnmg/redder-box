import { combineReducers } from 'redux';
import user from './user';
import messages from './messages';

const reducers = {
	user: user,
	messages: messages
}

export default combineReducers(reducers);