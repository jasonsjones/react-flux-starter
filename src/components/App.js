import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import authStore from '../stores/authStore';
import * as authAction from '../actions/authActions';

import Home from './Home';
import Login from './Login';

import css from '../styles.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            currentUser: authStore.getCurrentUser(),
            token: authStore.getToken()
        };

        this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    componentWillMount() {
        authStore.on('change', this.updateUser);
    }

    componentWillUnmount() {
        authStore.removeListener('change', this.updateUser);
    }

    updateUser() {
        this.setState({
            currentUser: authStore.getCurrentUser(),
            token: authStore.getToken()
        }); 
    }

    isUserAuthenticated() {
        return !!this.state.token;
    }

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Route exact path='/' render={() => (
                        this.isUserAuthenticated() ? (
                            <Home user={this.state.currentUser}/>
                        ) : (
                            <Redirect to='/login'/>
                        )
                    )} />
                    <Route path='/login' render={() => (
                        <Login isAuthenticated={this.isUserAuthenticated()} />
                    )}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;