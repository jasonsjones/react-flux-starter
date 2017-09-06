import AppDispatcher from '../dispatcher';

// temp user list
const users = [
    {
        name: 'Oliver Queen',
        email: 'oliver@qc.com',
        password: 'arrow'
    },
    {
        name: 'John Diggle',
        email: 'dig@qc.com',
        password: 'spartan'
    }
];

function getAuthUser(user) {
    let theUser = users.find(function (u) {
        return (u.email === user.email) && (u.password === user.password);
    });
    return theUser
}

export function authenticateUser(user) {
    let theUser = getAuthUser(user);

    if (theUser) {
        let currentUser = {
            name: theUser.name,
            email: theUser.email
        };
        let token = 'jwt.token.fromServer';
        AppDispatcher.handleViewAction({
            actionType: "AUTHENTICATE_USER",
            data: {
                user: currentUser,
                token: token
            }
        });
    } else {
        let errorMsg = 'Oooops...Email and/or password is invalid';
        AppDispatcher.handleViewAction({
            actionType: "AUTHENTICATE_USER_ERROR",
            data: errorMsg
        });
    }

}

export function logoutUser(user) {
    AppDispatcher.handleViewAction({
        actionType: "LOGOUT_USER",
        data: user
    });
}
