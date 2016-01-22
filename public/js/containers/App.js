'use strict';

import React, { Component } from 'react';
import { Link } from 'react-router';

import Header from '../components/Header';

export default class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<div className="content">
					{this.props.children}
				</div>
			</div>
	)}
}