import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as AppActions from '../actions/AppActions';
import { fetchComment } from '../thunks/LoginThunk'
import Button from '../components/Button';

import _ from 'lodash';

export default class SubRedditPosts extends Component {
  
  constructor(props) {
    super(props)
    this.renderSubredditPosts = this.renderSubredditPosts.bind(this)
  }

  renderSubredditPosts(posts){
  	let _subredditPosts = _.map(posts, function(item, index){
  		return (<div key={index}>
          <h3><Link to={item.subreddit + "/comment/"+ item.id}>{item.title}</Link></h3>
          <div>Author: {item.author}</div>
          <div>{item.visited ? 'visited' : null} score: {item.score}</div>
        </div>);
  	}.bind(this));

  	return _subredditPosts;
  }

  getComment(reddit){
    this.props.dispatch(fetchComment(reddit));
  }

  render() {
    return (
      <div>
        <p>Posts</p>
        <div>
        	{this.renderSubredditPosts(this.props.posts)}
        </div>
      </div>
    );
  }
}