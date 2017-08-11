import AppDispatcher from '../dispatcher';

export function authenticateUser(user) {
    AppDispatcher.handleAction({
        actionType: "AUTHENTICATE_USER",
        data: user
    });
}

export function logoutUser(user) {
    AppDispatcher.handleAction({
        actionType: "LOGOUT_USER",
        data: user
    });
}
