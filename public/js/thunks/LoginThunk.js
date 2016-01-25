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

export function fetchSubreddits () {
  	return function (dispatch) {
		return reqwest({
			method: 'get',
			url: 'http://localhost:8000/subreddits',
			contentType: 'application/json',
  			crossOrigin: true,
		}).then(function(response){
			console.log(response);
    		dispatch(fetchNewSubreddits(response[0].displayName));
    		dispatch(AppActions.getSubreddits(response));
		});
	}
}

export function fetchNewSubreddits (url) {
  	return function (dispatch) {
		return reqwest({
			method: 'get',
			url: 'http://localhost:8000/subreddits/new',
			contentType: 'application/json',
  			crossOrigin: true,
  			data:{
  				url: url
  			}
		}).then(function(response){
			dispatch(AppActions.getSubredditPost(response));
		});
	}
}

export function fetchComment (reddit) {
  	return function (dispatch) {
		return reqwest({
			method: 'get',
			url: 'http://localhost:8000/comments',
			contentType: 'application/json',
  			crossOrigin: true,
  			data:{
  				subreddit: reddit.subreddit,
  				id: reddit.id
  			}
		}).then(function(response){
			dispatch(AppActions.setActiveComment(response));
		});
	}
}