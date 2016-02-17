import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../actions/AppActions';
import { fetchMessagesInbox } from '../thunks/MessageThunk'

import Button from '../components/Button';
import SelectedPane from '../components/SelectedPane';
import Messages from '../components/Messages';

import _ from 'lodash';
import moment from 'moment';

export default class MessagesPage extends Component {
  
  constructor(props) {
    super(props)
    this.state = {isOpen: false}
    this.fetchMessagesFromInbox = this.fetchMessagesFromInbox.bind(this)
    this.selectPane = this.selectPane.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(fetchMessagesInbox());
  }

  fetchMessagesFromInbox(){
    this.props.dispatch(fetchMessagesInbox());
  }

  render() {
    return (
      <div>
        <section className="meet-intro">
          <div className="container">
            <header>
              <h1>Redder Box</h1>
              Messages Waiting to be seen
              <div onClick={this.selectPane} className="number">{this.props.messages.length}</div>
            </header>
          </div>
        </section>
        <SelectedPane isOpen={this.state.isOpen}>
          <Messages messages={this.props.messages} />
        </SelectedPane>
      </div>
    );
  }

  selectPane() {
    console.log('select');
    this.setState({
      isOpen: true
    })
  }
}

function mapStateToProps(state) {
    const { user , messages, redditUser } = state
    
    console.log(state, 'Message Page');
    
    return {
      messages: state.messages.messages,
      user: state.user.user,
      redditUser: state.user.redditUser
    }
}

export default connect(mapStateToProps)(MessagesPage)
