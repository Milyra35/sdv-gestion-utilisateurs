import {defineStore} from 'pinia';

interface User {
    _id: string;
    name: string;
    email: string;
    password?: string;
}

export const useUserStore = defineStore('user', {
    state: () => ({
        loggedUser: null as User | null,
        isLogged: false
    }),

    actions: {
        loginUser(user: User) {
            this.loggedUser = user;
            this.isLogged = true;
            localStorage.setItem('loggedUser', JSON.stringify(user));
        },

        logoutUser() {
            this.loggedUser = null;
            this.isLogged = false;
            localStorage.removeItem('loggedUser');
        },

        fromStorage() {
            const storedUser = localStorage.getItem('loggedUser');
            if(storedUser) {
                this.loggedUser = JSON.parse(storedUser);
                this.isLogged = true;
            }
        }
    },
    
    getters: {
        isLoggedUser: (state) => {
            return (id: string) => {
                return state.loggedUser?._id === id;
            }
        },
    },
});