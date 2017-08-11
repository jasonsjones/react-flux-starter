import React from 'react';

import authStore from '../stores/authStore';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        authStore.logoutUser(this.props.user);
    }

    render() {
        return (
            <div>
                <h1 className="slds-text-heading_large">Home page!</h1>
                <h3 className="slds-text-heading_medium">Hello, {this.props.user.name}</h3>
                <button className="slds-button slds-button_neutral slds-m-top_medium" onClick={this.handleClick}>Logout</button>
            </div>
        );
    } 
}

export default Home;