import React, { Component } from 'react';
import '../Styles/Components/CloudTagItem.css';

export default class CloudTagItem extends Component{

	render(){
		return <>
			<li>{this.props.tag.name} <em>({this.props.tag.counter})</em></li>
		</>;		
	}

}