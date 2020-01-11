import React, { Component } from 'react';

import '../Styles/Components/Step.css';

export default class Step extends Component{

	processStatus(){
		let cssClass = "";
		switch(this.props.status){
			case true: cssClass = "active"; break;
			case false: cssClass = "fail"; break;
			default:
				cssClass = null;
				break;
		}
		return cssClass;
	}

	render(){
		return(
			<>
				<dl className={this.processStatus()}>
					<dt className="text-center">{this.props.order}</dt>
					<dd>
						<h3>{this.props.title}</h3>
						<p>{this.props.description}</p>
					</dd>
				</dl>
			</>
		);
	}
}