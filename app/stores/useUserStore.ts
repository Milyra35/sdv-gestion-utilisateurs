import {defineStore} from 'pinia';

interface User {
    id: number;
    name: string;
    email: string;
}

export const useUserStore = defineStore('user', {
    state: () => ({
        loggedUser: {
            id: 1,
            name: 'Marie',
            email: 'marie@gmail.com',
            password: 'azerty'
        }
    }),

    
    getters: {
        isLoggedUser: (state) => (id: number) => {
            return id === state.loggedUser?.id;
        },
    },
});