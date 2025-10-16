import { useUserStore } from '~/stores/useUserStore';

 export function useAuth() {
    const userStore = useUserStore();

    const login = async (email:string, password: string) => {
        const response = await api('/auth/login', {
            method: 'POST',
            body: JSON.stringify({email, password})
        })
        userStore.loginUser(response.user);
        return true;
    };

    const logout = () => {

    }
}