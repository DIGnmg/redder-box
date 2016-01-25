import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../actions/AppActions';
import { fetchMessagesInbox } from '../thunks/MessageThunk'
import Button from '../components/Button';

import _ from 'lodash';
import moment from 'moment';

export default class LoginPage extends Component {
  
  constructor(props) {
    super(props)
    this.fetchMessagesFromInbox = this.fetchMessagesFromInbox.bind(this)
    this.rawHTML = this.rawHTML.bind(this)
    this.renderMessages = this.renderMessages.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(fetchMessagesInbox());
  }

  fetchMessagesFromInbox(){
    this.props.dispatch(fetchMessagesInbox());
  }

  rawHTML(raw) {
    return { __html: raw };
  }

  renderMessages(messages){
    let _messages = _.map(messages, function(item, index){
    // let createdTime = moment(item.created);
          // <p><strong>created:</strong>{createdTime}</p>
      return (
        <div className="message" key={index}>
          <h1>{item.subject}</h1>
          <div dangerouslySetInnerHTML={this.rawHTML(item.bodyHtml)} />
          <p><strong>from:</strong> {item.author}</p>
          <p><strong>link:</strong> <a href={item.linkTitle}>{item.linkTitle}</a></p>
          <p><strong>subreddit:</strong> {item.subreddit}</p>
        </div>)
    }.bind(this));

    return _messages;
  }

  render() {
    return (
      <div>
        <Button text={'get latest messages'} handleClick={this.fetchMessagesFromInbox} />
        <section className="meet-intro">
          <div className="container">
            <header>
              <h1>Redder Box</h1>
              Messages Waiting to be seen
              <div className="number">{this.props.messages.length}</div>
            </header>
          </div>
        </section>
        <section className="meet-details">
          <div className="container">
            <header>
              {this.renderMessages(this.props.messages)}
            </header>
          </div>
        </section>
      </div>
    );
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

export default connect(mapStateToProps)(LoginPage)
