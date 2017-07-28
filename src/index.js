import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './components/App';
import css from './styles.css';

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path='/' component={App} />
            <Route path='/home' render={() => <div className="container"><h1>Home page!</h1></div>} />
        </div>
    </BrowserRouter>,
    document.getElementById('app')
);