import React from 'react';

const Home = (props) => {
    return (
        <div>
            <h1 className="slds-text-heading_large">Home page!</h1>
            <h3 className="slds-text-heading_medium">Hello, {props.user.name}</h3>
        </div>
    );
};

export default Home;