import reqwest from 'reqwest';
import * as AppActions from '../actions/AppActions';

export function fetchMessagesInbox () {
  	return function (dispatch) {
		return reqwest({
			method: 'get',
			url: 'http://localhost:8000/messages',
			contentType: 'application/json',
  			crossOrigin: true,
		}).then(function(response){
			console.log(response);
    		dispatch(AppActions.getMessagesInbox(response));
		});
	}
}