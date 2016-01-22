import React, { Component, PropTypes } from 'react';
import { SOME_ACTION } from '../constants/ActionTypes';


export default class Button extends Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    console.log('clicked');
    this.props.handleClick();
  }

  render() {
    return (
        <button onClick={this.handleClick}>{this.props.text}</button>
    );
  }
}