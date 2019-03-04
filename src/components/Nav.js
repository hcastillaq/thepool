import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends Component {
	render() {
		return (
			<div className="nav">
			  navbar
				<div>
					<ul>
						<li>
							<Link to="/">Home page</Link>
						</li>
						<li>
							<Link to="/post/new">Add Post</Link>
						</li>
        	</ul>
				</div>
			</div>
		);
	}
}
