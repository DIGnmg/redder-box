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
    let createdTime = moment(item.created*1000).format('D MMM, YYYY H:mm a');
    let content = item.body.slice(0,45);
      return (
        <div className="message" key={index}>
          <div className="message-row">
            <h3>{item.subject}</h3>
            <p>{createdTime} by: {item.author}</p>
            <p>{content}</p>
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
