import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import './index.css';
import Logo from './Images/logo-minuto.png';

import Dashboard from './Pages/Dashboard';
import Setup from './Pages/Setup';
import RestrictedTerms from './Pages/RestrictedTerms';

function Index() {
  return (
    <Router>
        <Redirect to='/restricted-terms'/>
        <header>
        	<div className="col left">
                <img src={Logo} alt="Logo" />
        	</div>
        	<nav className="col">
                <ul>
                    <li><NavLink to="/setup" activeClassName="active">Configurações</NavLink></li>
                    <li><NavLink to="/restricted-terms" activeClassName="active">Termos</NavLink></li>
                    <li><NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink></li>
                </ul>
        	</nav>
        </header>
        <main>
            <Route exact path="/setup" component={Setup} />
            <Route exact path="/restricted-terms" component={RestrictedTerms} />
            <Route exact path="/dashboard" component={Dashboard} />
        </main>
    </Router>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
serviceWorker.unregister();
