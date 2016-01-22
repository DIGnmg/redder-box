import * as types from '../constants/ActionTypes';

export function addUser(payload) {
  return {
    type: types.ADD_USER,
    payload: payload
  }
}

export function getSubreddits(payload) {
  return {
    type: types.GET_SUBREDDITS,
    payload: payload
  }
}

export function getSubredditPost(payload) {
  return {
    type: types.GET_SUBREDDIT_POSTS,
    payload: payload
  }
}

export function getRedditUser(payload) {
  return {
    type: types.GET_REDDITUSER,
    payload: payload
  }
}

export function getMessagesInbox(payload) {
  return {
    type: types.GET_MESSAGES_INBOX,
    payload: payload
  }
}

export function setActiveSubreddit(payload) {
  return {
    type: types.SET_ACTIVE_SUBREDDIT,
    payload: payload
  }
}

export function setActiveComment(payload) {
  return {
    type: types.SET_ACTIVE_COMMENT,
    payload: payload
  }
}