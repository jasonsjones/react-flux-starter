import React from 'react';
import { Redirect } from 'react-router-dom';

import * as authAction from '../actions/authActions';

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input type='text' id="email" name="email"
              value={props.value.email} onChange={props.handleChange}/>
            <br/>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name="password"
              value={props.value.password} onChange={props.handleChange}/>
            <br/>
            <button type='submit'>Login</button>
        </form>
    );
}

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value
        });
    }

    resetForm() {
        this.setState({
            email: '',
            password: ''
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        authAction.authenticateUser({
            email: this.state.email,
            password: this.state.password
        });
        this.resetForm();
    }

    render() {
        return (
            this.props.isAuthenticated ? (
                <Redirect to='/'/>
            ) : (
            <div>
                <h1>Login</h1>
                <LoginForm handleSubmit={this.handleSubmit}
                           handleChange={this.handleChange}
                           value={this.state} />
            </div>
            )
        );
    }
}
