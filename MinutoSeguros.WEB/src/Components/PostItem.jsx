import React, { Component } from 'react';
import '../Styles/Components/PostItem.css';
import CloudTagItem from './CloudTagItem';

export default class PostItem extends Component{

	render(){
		return <>
			<dl className="motion">
				<dt><a href={this.props.post.link} target="_blank" rel="noopener noreferrer">{this.props.post.title}</a></dt>
				<dd>
					<ul>
						{
							this.props.tags && 
							this.props.tags.map(t => <CloudTagItem tag={t} key={t.id} />)
						}
					</ul>
				</dd>
				<div>
					<strong>Palavra{this.props.post.counter>1 && "s"}:</strong> {this.props.post.counter}
				</div>
			</dl>
		</>;		
	}

}