import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../actions/AppActions';
import { fetchSubreddits, fetchNewSubreddits } from '../thunks/LoginThunk'
import Button from '../components/Button';

//Subreddit Components
import SubRedditList from '../components/SubredditList';
import SubRedditPosts from '../components/SubredditPosts';

import _ from 'lodash';

export default class SubredditPage extends Component {
  
	constructor(props) {
		super(props)
		this.fetchNewPosts = this.fetchNewPosts.bind(this)
	}

	componentDidMount() {	
		this.props.dispatch(fetchSubreddits());
	}

	fetchNewPosts(subreddits){
    	this.props.dispatch(fetchSubreddits());
    }


  render() {
    return (
      <div>
        <p>Subreddits</p>
        <input type="search" value="Search" />
        <div className="col-sm-4">
        	<SubRedditList dispatch={this.props.dispatch} list={this.props.subreddits} />
		</div>
		<div className="col-sm-8">
	        <SubRedditPosts dispatch={this.props.dispatch} posts={this.props.subredditsposts} />
		</div>
      </div>
    );
  }
}
function mapStateToProps(state) {
    const { user , subreddits, redditUser } = state
    
    console.log(state, 'SubReddit Page');
    
    return {
      subreddits: state.subreddits.subreddits,
      subredditsposts: state.subreddits.subredditsposts,
      user: state.user.user,
      redditUser: state.user.redditUser
    }
}

export default connect(mapStateToProps)(SubredditPage)