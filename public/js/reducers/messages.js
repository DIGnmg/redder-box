import { GET_MESSAGES_INBOX } from '../constants/ActionTypes';
import Immutable from 'seamless-immutable'

const initialState =  Immutable({messages:[]});

export default function someapp(state = initialState, action) {
  switch (action.type) {
	  case GET_MESSAGES_INBOX:
	    return Immutable(state).merge({
	    	messages: action.payload
	    });
	  default:
	    return state;
	  }
}