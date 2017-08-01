import EventEmitter from 'events';
import authDispatcher from '../dispatcher';

class AuthStore extends EventEmitter {
    constructor() {
        super();
        this.currentUser = null
    }
    getCurrentUser() {
        return this.currentUser;
    }
    authenticateUser(user) {
        if (user.password == 'arrow') {
            this.currentUser = user;
            this.emit('change');
        }
    }

    handleActions(action) {
        switch(action.actionType) {
            case 'AUTHENTICATE_USER':
                this.authenticateUser(action.data);
                break;
            default:
        }
    }
}

const authStore = new AuthStore();
authDispatcher.register(authStore.handleActions.bind(authStore));

export default authStore;