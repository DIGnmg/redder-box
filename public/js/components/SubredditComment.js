import React, { Component } from 'react';
import _ from 'lodash';

export default class SubRedditPosts extends Component {
  
  constructor(props) {
    super(props)
    this.state = {comments: props.comments}
    this.renderHeader = this.renderHeader.bind(this)
    this.renderCommentContent = this.renderCommentContent.bind(this)
  }

  renderHeader(header){
    if(header != null){
  		return (
        <div>
          <h3>{header.title}</h3>
          <div>Author: {header.author}</div>
        </div>
      );
    }
  }

  renderCommentContent(content){
    if(content != null){
      let _content = _.map(content, function(item, index){
        return (
          <div key={index}>
            <div>author: {item.author}</div>
            <div>body: {item.body}</div>
            <div>likes: {item.likes}</div>
            <div>score: {item.score}</div>
          </div>);
      }.bind(this));
      return _content;
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.renderHeader(this.props.comments.header)}
        	{this.renderCommentContent(this.props.comments.comments)}
        </div>
      </div>
    );
  }
}