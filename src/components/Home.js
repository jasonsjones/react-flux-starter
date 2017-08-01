import React from 'react';

const Home = (props) => {
    return (
        <div>
            <h1>Home page!</h1>
            <h3>Hello, {props.user.name}</h3>
        </div>
    );
};

export default Home;