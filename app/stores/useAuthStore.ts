import { defineStore } from 'pinia';

interface User {
    _id: string
    email: string
    name: string
    password: string
}

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: (useCookie('token').value as string | null) || null,
        user: null as User | null,
        loading: false,
        error: null
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        getUser: (state) => (id: string) => state.user?._id === id,
    },

    actions: {
        async login(email: string, password: string) {
            const { $api } = useNuxtApp();

            this.loading = true;
            this.error = null;

            try {
                const response = await $api<{ token: string; user: any }>('/auth/login', {
                    method: 'POST',
                    body: { email, password }
                });

                this.token = response.token;
                const tokenCookie = useCookie('token', {
                    maxAge: 60 * 60 * 24 * 7
                });
                tokenCookie.value = response.token;
                this.user = response.user;
                // console.log(this.user);
                // console.log('logged in');
            } catch (error: any) {
                console.log(error);
                this.error = error.data?.message || 'Erreur de connexion';
                throw new Error(this.error);
            } finally {
                this.loading = false
            }
        },

        async register(name: string, email: string, password: string) {
            const { $api } = useNuxtApp()

            this.loading = true;
            this.error = null;

            try {
                const response = await $api<{ token: string; user: any }>('/auth/register', {
                    method: 'POST',
                    body: { email, name, password }
                })

                this.token = response.token
                const tokenCookie = useCookie('token', {
                    maxAge: 60 * 60 * 24 * 7
                })
                tokenCookie.value = response.token;
                this.user = response.user;
            } catch (error: any) {
                this.error = error.data?.message || 'Erreur lors de l\'inscription';
                throw new Error(error);
            } finally {
                this.loading = false
            }
        },

        async getUser() {
            if (!this.token) return;

            const { $api } = useNuxtApp()

            try {
              const user = await $api<User>('/users/me');
              this.user = user;
            } catch (error) {
              console.error('Failed to fetch user');
              this.logout();
              throw error;
            }
        },

        async updateUser(userData: Partial<User>) {
            if (!this.token) return

            const { $api } = useNuxtApp()
            this.loading = true

            try {
                const updatedUser = await $api<User>(`/users/${this.user?._id}`, {
                    method: 'PUT',
                    body: userData
                })
                this.user = updatedUser
                return updatedUser
            } catch (error) {
                console.error('Failed to update user:', error)
                throw new Error('Failed to update user')
            } finally {
                this.loading = false
            }
        },

        async deleteUser(userId: number) {
            if (!this.token) return

            const { $api } = useNuxtApp()
            this.loading = true

            try {
                await $api(`/users/${userId}`, {
                    method: 'DELETE'
                })
                this.logout()
            } catch (error) {
                console.error('Failed to delete user:', error)
                throw new Error('Failed to delete user')
            } finally {
                this.loading = false
            }
        },

        logout() {
            this.user = null
            this.token = null
            const tokenCookie = useCookie('token')
            tokenCookie.value = null
            navigateTo('/auth/login');
        },
    }
})