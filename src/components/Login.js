import React from 'react';
import { Redirect } from 'react-router-dom';

import * as authAction from '../actions/authActions';

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input type='text' id="email"/>
            <br/>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password'/>
            <br/>
            <button type='submit'>Login</button>
        </form>
    );
}

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        authAction.authenticateUser({name: 'Oliver Queen', password: 'arrow'});
    }
    
    render() {
        return (
            this.props.isAuthenticated ? (
                <Redirect to='/'/>
            ) : (
            <div>
                <h1>Login</h1>
                <LoginForm handleSubmit={this.handleSubmit}/>
            </div>
            )
        );
    }
}
