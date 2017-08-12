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
        let user = this.state.currentUser;
        let isAuthenticated = this.isUserAuthenticated();
        return (
            <BrowserRouter>
                <div className="container">
                    <Route exact path='/' render={() => (
                        isAuthenticated ? (
                            <Home user={user}/>
                        ) : (
                            <Redirect to='/login'/>
                        )
                    )} />
                    <Route path='/login' render={() => (
                        isAuthenticated ? (
                            <Redirect to='/'/>
                        ) : (
                            <Login isAuthenticated={this.isUserAuthenticated()} />
                        )
                    )}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;