import reqwest from 'reqwest';
import * as AppActions from '../actions/AppActions';

export function Login () {
  	return function (dispatch) {
		return reqwest({
			method: 'get',
			url: 'http://localhost:8000/login',
			contentType: 'application/json',
  			crossOrigin: true
		}).then(function(response){
			console.log(response, 'Login');
    		dispatch(AppActions.addUser(response));
		});
	}
}

export function fetchRedditUser () {
  	return function (dispatch) {
		return reqwest({
			method: 'get',
			url: 'http://localhost:8000/users',
			contentType: 'application/json',
  			crossOrigin: true,
		}).then(function(response){
			console.log(response);
    		dispatch(AppActions.getRedditUser(response));
		});
	}
}