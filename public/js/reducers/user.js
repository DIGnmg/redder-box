import { ADD_USER, GET_REDDITUSER } from '../constants/ActionTypes';
import Immutable from 'seamless-immutable'

const initialState =  Immutable({user:[]});

export default function someapp(state = initialState, action) {
  switch (action.type) {
	  case ADD_USER:
	    return Immutable(state).merge({
	    	user: action.payload
	    });
	  case GET_REDDITUSER:
	    return Immutable(state).merge({
	    	redditUser: action.payload
	    });
	  default:
	    return state;
	  }
}

