import React, {Component} from 'react';
import '../Styles/Components/TermsItem.css';

export default class TermsItem extends Component{
	
	constructor(props){
		super(props);
		this.callRemoveHandler = this.callRemoveHandler.bind(this);
	}

	callRemoveHandler(){
		this.props.handleDelete(this.props.id);
	}

	render(){
		return(
			<article>
				<dd>{this.props.name}</dd>
				<dt onClick={this.callRemoveHandler}>X</dt>
			</article>
		);
	}

}