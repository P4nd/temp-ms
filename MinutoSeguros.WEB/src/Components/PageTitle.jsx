import React, { Component } from 'react';
import Loader from '../Images/loader.svg';

export default class PageTitle extends Component{
	render(){
		return(
			<>
				<h1>
					{this.props.loading && <img src={Loader} title="Loading" alt="Loading" width="80" height="80" />}
					<span>{this.props.title}</span><br />
					<em><small>{this.props.description}</small></em>
				</h1>
			</>
		);
	}
}