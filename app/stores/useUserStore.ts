import { defineStore } from 'pinia';

interface User {
    _id: string;
    name: string;
    email: string;
    password?: string;
}

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [] as User[],
        loading: false,
        error: null as string | null
    }),

    actions: {
        async getUsers () {
            const { $api } = useNuxtApp();

            this.loading = true;
            this.error = null;
            
            try {
                const response = await $api<User[]>('/users', {
                    method: 'GET',
                });
                this.users = response;
            } catch (error) {
                console.log(error);
                this.error = 'Failed to load users';
                throw new Error('Failed to load users');
            } finally {
                this.loading = false;
            }

        }, 

        async deleteUser (id: number) {
            const { $api } = useNuxtApp()

            this.loading = true

            try {
                await $api(`/users/${id}`, {
                    method: 'DELETE',
                })
    
                this.users = this.users.filter(user => user._id !== id)
            } catch (error) {
                console.log(error);
                throw new Error('Delete user failed')
                
            } finally {
                this.loading = false
            }
        }
        
    }
});