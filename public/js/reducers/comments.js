import { SET_ACTIVE_COMMENT} from '../constants/ActionTypes';
import Immutable from 'seamless-immutable'

const initialState =  Immutable({comments:[]});

export default function someapp(state = initialState, action) {
  switch (action.type) {
	  case SET_ACTIVE_COMMENT:
	    return Immutable(state).merge({
	    	comments: action.payload
	    });
	  default:
	    return state;
	  }
}