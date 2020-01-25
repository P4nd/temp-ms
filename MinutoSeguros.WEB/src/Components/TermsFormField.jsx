import React, {Component} from 'react';
import '../Styles/Components/TermsFormField.css';
import * as Services from '../Utils/Services';

export default class TermsFormField extends Component{

	constructor(props){
		super(props);
		this.state = {value: '', css: '', label: '', message: ''};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event){
		this.setState({value: event.target.value});
	}

	handleSubmit(event){
		let _css = "";
		let _label = "";
		let _message = "";
		if(this.state.value === ""){
			_css = "warning";
			_label = 'Atenção:';
			_message = "por favor preencha algo.";
		}else{
			if(!this.props.handleExisting(this.state.value)){
				_css = "danger";
				_label = 'Erro:';
				_message = "termo já utilizado";
			}else{				
				Services
					.PostRestrictedTerm(this.state.value)
						.then(s => {
							this.props.handleInclusion();
							this.setState({css: "success", label: "Parabéns", message: s.data, value: ''});
							setTimeout(() => {
								this.setState({value: '', css: '', label: '', message: ''});
							}, 3000);							
						})
						.catch(e => this.setState({css: "danger", label: "Atenção", message: e.data}));
			}
		}

		this.setState({css: _css, label: _label, message: _message});
		event.preventDefault();		
	}

	render(){
		return(
			<form className="restricted-terms" onSubmit={this.handleSubmit}>				
				{this.state.css && <label className={this.state.css}><strong>{this.state.label}</strong> {this.state.message}</label>}
				<input type="text" placeholder="Digite o termo aqui..." value={this.state.value} onChange={this.handleChange} /><button type="submit">+</button>				
			</form>
		);
	}

}