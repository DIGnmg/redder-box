import { GET_SUBREDDITS, GET_SUBREDDIT_POSTS} from '../constants/ActionTypes';
import Immutable from 'seamless-immutable'

const initialState =  Immutable({subreddits:[]});

export default function someapp(state = initialState, action) {
  switch (action.type) {
	  case GET_SUBREDDITS:
	    return Immutable(state).merge({
	    	subreddits: action.payload
	    });
	  case GET_SUBREDDIT_POSTS:
	    return Immutable(state).merge({
	    	subredditsposts: action.payload
	    });
	  default:
	    return state;
	  }
}