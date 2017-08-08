import EventEmitter from 'events';
import AppDispatcher from '../dispatcher';

class AuthStore extends EventEmitter {
    constructor() {
        super();
        this.currentUser = null
        this.users = [
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
        ]
    }

    getCurrentUser() {
        return this.currentUser;
    }

    authenticateUser(user) {
        // simulate back-end server call to authenticate user
        let theUser = this.users.find(function (u) {
            return (u.email === user.email) && (u.password === user.password);
        });
        if (theUser) {
            this.currentUser = {
                name: theUser.name,
                email: theUser.email
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