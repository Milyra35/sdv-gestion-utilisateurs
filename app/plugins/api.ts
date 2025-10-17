import { useAuthStore } from "~/stores/useAuthStore";

export default defineNuxtPlugin(() => {
    const authStore = useAuthStore();

    const api = $fetch.create({
        baseURL: 'http://localhost:3001' as string,
        onRequest({options}) {
            const token = authStore.token;

            if (token) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${token}`
                };
            }
        },

        onResponseError({response}) {
            // console.log(response);
            if (response.status === 401) {
                authStore.logout();

                navigateTo('/users');
            }
        }
    })

    return { provide: { api } }
})