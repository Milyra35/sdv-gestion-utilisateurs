const getToken = (): string | null => {
    if(import.meta.client) {
        return localStorage.getItem('auth_token');
    }
    return null;
}

const api = $fetch.create({
    baseURL: 'http://localhost:3001' as string,
    onRequest({options}) {
        const token = getToken();

        if(token) {
            options.headers = {
                ...options.headers,
                Authorization: `Bearer ${token}`
            }
        };

        options.headers = {
            ...options.headers,
            'Content-Type': 'application/json',
        };
    },

    async onResponseError({response}) {
        if (response.status === 401) {
            if (import.meta.client) {
                localStorage.removeItem('auth_token');
            }
            await navigateTo('/login');
        }
    }
})

export default api;