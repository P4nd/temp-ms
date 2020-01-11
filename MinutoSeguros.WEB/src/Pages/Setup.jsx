import React, { Component } from 'react';
import '../Styles/Pages/Setup.css';
import PageTitle from '../Components/PageTitle';
import Step from '../Components/Step';
import * as Services from '../Utils/Services';

export default class Setup extends Component{

	constructor(props){

		super(props);

		this.state = {
			mode: 'wizard',
			step: 0,
			isLoading: false,
			steps: []
		};

		this.runSteps = this.runSteps.bind(this);

	}

	runSteps(){

		this.doLoad();
		let whichStep = "";

		switch(this.state.step){
			case 0: whichStep="one"; break;
			case 1: whichStep="two"; break;
			case 2: whichStep="three"; break;
			case 3: whichStep="four"; break;
			default:
				whichStep = "";
				this.doLoad(false);
				break;
		}

		if(whichStep !== ""){
			Services
				.GetSteps(whichStep)
					.then(s => this.applyChanges(s))
					.catch(e => {
						this.doLoad(false);
					});
		}
		
	}

	applyChanges(status){
		let stepStates = this.state.steps;
		stepStates[this.state.step] = status;
		
		this.setState(s => ({
			isLoading: false,
			steps: stepStates,
			step: ++s.step,
			mode: (s.step === 4 ? "done" : "wizard")
		}));
	}

	doLoad(isBeginningState = true){
		this.setState(s => ({ isLoading: isBeginningState }));
	}

	render(){
		return (
			<div className={"motion setup " + this.state.mode}>

				<PageTitle title="Configurações" description="Setup inicial do sistema" loading={this.state.isLoading} />

				<div id="wizard">
					<Step status={this.state.steps[0]} order="1" title="Limpeza" description="Apague todos os objetos do banco" />
					<Step status={this.state.steps[1]} order="2" title="Servidor" description="Efetue a leitura de posts novos" />
					<Step status={this.state.steps[2]} order="3" title="Contagem" description="Contaremos as palavras sem termos restritos" />
					<Step status={this.state.steps[3]} order="4" title="Tags" description="Utilizaremos as 10 palavras repetidas sem termos restritos" />
					{	
						!this.state.isLoading && 
						<p className="text-center"><button onClick={this.runSteps}>{this.state.step === 0 ? "Iniciar" : "Avançar"}</button></p>
					}
				</div>
				
				<h4 id="done" className="text-center">
					<span>&#x263B;</span>
					Feito, Obrigado!
				</h4>

			</div>
		);
	}

}