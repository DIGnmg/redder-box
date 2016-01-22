import React, { Component } from 'react';

export default class AuthenticatedCoreLayout extends Component {
	render() {
		return (
			<div>
				{this.props.children}
			</div>
	);
}
}
