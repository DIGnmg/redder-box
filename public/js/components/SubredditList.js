import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../actions/AppActions';
import { fetchSubreddits, fetchNewSubreddits } from '../thunks/LoginThunk'
import Button from '../components/Button';

import _ from 'lodash';

export default class SubRedditList extends Component {
  
  constructor(props) {
    super(props)
    this.state = {edit:false};
    this.renderSubreddits = this.renderSubreddits.bind(this)
    this.fetchNewPosts = this.fetchNewPosts.bind(this)
    this.editSubreddits = this.editSubreddits.bind(this)
  }

  renderSubreddits(subreddits){
  	let _subreddits = _.map(subreddits, (item, index) => {
  		return (<li key={index}>{item.displayName} : <a onClick={() => this.fetchNewPosts(item.displayName)}>{item.url}</a> <Button text={'unsubscribe'} handleClick={this.unsubscribe} /></li>)
  	});

  	return _subreddits;
  }

	fetchNewPosts(url){
    this.props.dispatch(fetchNewSubreddits(url));
  }

  editSubreddits(){
    this.setState({ edit:true });
  }

  render() {
    return (
      <div>
      <Button text={'Edit'} handleClick={this.editSubreddits} />
        <ul>
        	{this.renderSubreddits(this.props.list)}
        </ul>
      </div>
    );
  }
}