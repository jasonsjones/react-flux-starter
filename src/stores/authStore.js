import EventEmitter from 'events';
import AppDispatcher from '../dispatcher';

class AuthStore extends EventEmitter {
    constructor() {
        super();
        this.currentUser = null
    }

    getCurrentUser() {
        return this.currentUser;
    }

    authenticateUser(user) {
        // simulate back-end server call to authenticate user
        if (user.password == 'arrow') {
            this.currentUser = {
                name: user.name
            };
            // this is a good place to store the token (if sent from server)
            // and current user data in local or session storage
            this.emit('change');
        }
    }

    handleActions(action) {
        let payload = action.action;
        switch(payload.actionType) {
            case 'AUTHENTICATE_USER':
                this.authenticateUser(payload.data);
                break;
            default:
        }
    }
}

const authStore = new AuthStore();
AppDispatcher.register(authStore.handleActions.bind(authStore));

export default authStore;