import React, { Component } from 'react';
import PageTitle from '../Components/PageTitle';
import * as Services from '../Utils/Services';
import PostItem from '../Components/PostItem';

export default class Dashboard extends Component{

	constructor(props){
		super(props);
		this.state = {
			isLoading: true,
			serverData: null
		};
	}

	componentDidMount(){
		Services.GetPostsAndTags()
			.then(
				d => this.setState(s => ({
						isLoading: false,
						serverData: (d.length === 0 ? null : d)
					})
				)
			).catch(e => {
				this.setState(s => ({ isLoading: false }));
			});
	}

	render(){
		return(
			<div className="motion dashboard">

				<PageTitle title="Dashboard" description="Listagem de tópicos" loading={this.state.isLoading} />

				{
					this.state.serverData && 
					this.state.serverData.map(p => <PostItem post={p} tags={p.tags} key={p.id} />)
				}

				{
					this.state.serverData === null &&
					<p className="text-center">Nenhum dado a ser exibido</p>
				}
				
			</div>
		);
	}

}