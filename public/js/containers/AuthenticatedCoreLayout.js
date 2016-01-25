import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default class AuthenticatedCoreLayout extends Component {
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}
function mapStateToProps(state) {
    const { user , subreddits, redditUser } = state
    
    console.log(state, 'Login Page');
    
    return {
      subreddits: state.subreddits.subreddits,
      user: state.user.user,
      redditUser: state.user.redditUser
    }
}

export default connect(mapStateToProps)(AuthenticatedCoreLayout)
