import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../actions/AppActions';
import { fetchMessagesInbox } from '../thunks/MessageThunk'
import Button from '../components/Button';
import SelectedPane from '../components/SelectedPane';

import _ from 'lodash';
import moment from 'moment';

export default class Messages extends Component {
  
  constructor(props) {
    super(props)
    this.rawHTML = this.rawHTML.bind(this)
  }

  rawHTML(raw) {
    return { __html: raw };
  }

  renderMessages(messages){
    let _messages = _.map(messages, function(item, index){
    let createdTime = moment(item.created).format('h:mm');
      return (
        <div className="message" key={index}>
          <div className="message-row">
            {index + 1}: <span dangerouslySetInnerHTML={this.rawHTML(item.bodyHtml)} />
          </div>
          <div className="message-details message-row">
            <p><strong>created:</strong> {createdTime}</p>
            <p>{item.subject}</p>
            <p><strong>from:</strong> {item.author}</p>
            <p><strong>link:</strong> <a href={item.linkTitle}>{item.linkTitle}</a></p>
            <p><strong>subreddit:</strong> {item.subreddit}</p>
          </div>
        </div>
        )
    }.bind(this));

    return _messages;
  }

  render() {
    return (
      <div>
        {this.renderMessages(this.props.messages)}
      </div>
    );
  }
}
