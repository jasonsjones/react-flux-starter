import authDispatcher from '../dispatcher';

export function authenticateUser(user) {
    authDispatcher.dispatch({
        actionType: "AUTHENTICATE_USER",
        data: user
    });
}
