import AppDispatcher from '../dispatcher';

export function authenticateUser(user) {
    AppDispatcher.handleAction({
        actionType: "AUTHENTICATE_USER",
        data: user
    });
}
