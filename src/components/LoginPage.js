import React from 'react';
import { Redirect } from 'react-router-dom';

import authStore from '../stores/authStore';
import * as authAction from '../actions/authActions';

const styles = {
    loginform: {
        width: 350
    }
};

const InputElement = (props) => {
    return (
        <div className="slds-form-element slds-m-top_medium">
            <label className="slds-form-element__label" htmlFor={props.name}>{props.label}</label>
            <div className="slds-form-control__control">
                <input className="slds-input" type={props.type} id={props.name} name={props.name}
                value={props.value} onChange={props.handleChange}/>
            </div>
        </div>
    );
}

const LoginForm = (props) => {
    return (
        <form className="slds-form slds-form_stacked" onSubmit={props.handleSubmit}>
            <InputElement type="text" name="email" label="Email"
                value={props.value.email} handleChange={props.handleChange} />
            <InputElement type="password" name="password" label="Password"
                value={props.value.password} handleChange={props.handleChange} />
            <button type='submit' className="slds-button slds-button_brand slds-m-top_medium">Login</button>
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
            errorText = <p className="slds-text-color_error slds-text-heading_small slds-m-top_medium">
                            {this.state.errorMsg}
                        </p>
        }
        return (
            <div style={styles.loginform}>
                <h1 className="slds-text-heading_large">Login</h1>
                <LoginForm handleSubmit={this.handleSubmit}
                           handleChange={this.handleChange}
                           value={this.state} />
                {errorText}
            </div>
        );
    }
}
