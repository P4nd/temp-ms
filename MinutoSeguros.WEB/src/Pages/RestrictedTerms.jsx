import React, { Component } from 'react';
import TermsItem from '../Components/TermsItem';
import TermsFormField from '../Components/TermsFormField';
import '../Styles/Pages/RestrictedTerms.css';
import * as Services from '../Utils/Services';
import PageTitle from '../Components/PageTitle';

export default class RestrictedTerms extends Component{

	constructor(props){
		super(props);
		this.state = { isLoading: true, terms: [] };
		this.doRemove = this.doRemove.bind(this);
		this.hasItem = this.hasItem.bind(this);
		this.hasNewItem = this.hasNewItem.bind(this);
	}

	initData(){
		Services.GetRestrictedTerms()
			.then(d => 
				this.setState(s =>
					({
						isLoading: false,
						terms: (d.length === 0 ? null : d)
					})
				)
			).catch(e => console.log(e));
	}

	componentDidMount(){ this.initData(); }
	hasNewItem(){ this.initData(); }
	hasItem(name){ return this.state.terms.filter(t => t.name === name).length === 0; }

	doRemove(id){

		this.setState({ isLoading: true	});

		Services
			.DeleteRestrictedTerm(id)
				.then(d => {
					if(d.status === 200){
						this.setState({
							terms: this.state.terms.filter(t => t.id !== id),
							isLoading: false
						});
					}
				})
				.catch(e => console.log(e));
	}

	render(){
		return(
			<>
				<PageTitle title="Termos restritos" description="Items que não devemos considerar" loading={this.state.isLoading} />
				<aside>
					<TermsFormField handleExisting={this.hasItem} handleInclusion={this.hasNewItem} />
				</aside>
				<dl className="terms">
					{
						this.state.terms && 
						this.state.terms.map(t => <TermsItem name={t.name} key={t.id} id={t.id} handleDelete={this.doRemove} />)
					}
				</dl>
			</>
		);
	}

}