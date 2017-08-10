import React from 'react';
import { Redirect } from 'react-router-dom';

import authStore from '../stores/authStore';
import * as authAction from '../actions/authActions';

const styles = {
    loginform: {
        display: 'flex'
    },
    loginButton: {
        width: 50,
        height: 30,
        backgroundColor: "#ccc"
    },
    error: {
        color: 'red'
    }
};

const LoginForm = (props) => {
    return (
        <form style={styles.loginform} onSubmit={props.handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input type='text' id="email" name="email"
              value={props.value.email} onChange={props.handleChange}/>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' name="password"
              value={props.value.password} onChange={props.handleChange}/>
            <button type='submit' style={styles.loginButton}>Login</button>
        </form>
    );
}

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMsg: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.updateErrorMsg = this.updateErrorMsg.bind(this);
    }

    componentWillMount() {
        authStore.on('change', this.updateErrorMsg);
    }

    componentWillUnmount() {
        authStore.removeListener('change', this.updateErrorMsg);
    }

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({
            [name]: value
        });
    }

    updateErrorMsg() {
        this.setState({
            errorMsg: authStore.getErrorMessage()
        });
    }

    resetForm() {
        this.setState({
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
        let errorText = null;
        if (this.state.errorMsg) {
            errorText = <p style={styles.error}>{this.state.errorMsg}</p>
        }
        return (
            this.props.isAuthenticated ? (
                <Redirect to='/'/>
            ) : (
            <div>
                <h1>Login</h1>
                <LoginForm handleSubmit={this.handleSubmit}
                           handleChange={this.handleChange}
                           value={this.state} />
                {errorText}
            </div>
            )
        );
    }
}
