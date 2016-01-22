import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../actions/AppActions';
import { fetchComment } from '../thunks/LoginThunk'
import SubredditComment from '../components/SubredditComment';

import _ from 'lodash';

export default class SubredditCommentPage extends Component {
  
	constructor(props) {
		super(props)
	}

  componentDidMount() { 
    console.log(this.props.params);
    this.props.dispatch(fetchComment(this.props.params));
  }

  render() {
    return (
      <div>
        <p>Commnet</p>
        <SubredditComment comments={this.props.comments} />
      </div>
    );
  }
}
function mapStateToProps(state) {
    const { user, subreddits, subredditsposts, redditUser } = state
    
    console.log(state, 'Subreddit Commit Page');
    
    return {
      subreddits: state.subreddits.subreddits,
      comments: state.comments.comments,
      subredditsposts: state.subreddits.subredditsposts,
      user: state.user.user,
      redditUser: state.user.redditUser
    }
}

export default connect(mapStateToProps)(SubredditCommentPage)