import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../actions/AppActions';
import { Login, fetchRedditUser, fetchMessagesInbox } from '../thunks/LoginThunk'
import Button from '../components/Button';

import auth from '../utils/auth';

export default class LoginPage extends Component {
  
  constructor(props) {
    super(props)
    this.fetchUser = this.fetchUser.bind(this);
    this.updateAuth = this.updateAuth.bind(this);
    this.state = {loggedIn: auth.loggedIn(), error: false};
  }

  componentDidMount() {
    this.props.dispatch(Login());
  }

  fetchUser(){
    this.props.dispatch(fetchRedditUser());
  }


  updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps, 'nextProps');
    console.log(nextState, 'nextState');
    auth.login(nextProps.user);
  }

  componentWillMount() {
    auth.onChange = this.updateAuth
    if (this.props.user) {
      auth.login(this.props.user);
    };
  }

  render() {
    return (
      <div>
         <section className="meet-intro">
          <div className="container">
            <header>
              <button><a href="/connect/reddit">Login</a></button>
            </header>
          </div>
        </section>
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

export default connect(mapStateToProps)(LoginPage)
