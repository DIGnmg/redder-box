import React, { Component } from 'react';
import * as AppActions from '../actions/AppActions';
import { fetchMessagesInbox } from '../thunks/MessageThunk'
import Button from './Button';

import classNames from 'classnames';
import _ from 'lodash';
import moment from 'moment';

export default class SelectedPane extends Component {
  
  constructor(props) {
    super(props)
    this.state = {isOpen: false}
    this.renderPane = this.renderPane.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.renderPane(nextProps)
  }

  render() {
    let selectedClass = classNames('selected-pane', { selected: this.state.isOpen,  hidden: !this.state.isOpen });
    return (
        <div className={selectedClass}>
          <p onClick={this.toggle} className='close'>Close</p>
          <div>{this.props.children}</div>
        </div>
      );
  }

  renderPane(){
    this.toggle()
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
}
