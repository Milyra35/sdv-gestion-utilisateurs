import { useAuthStore } from "~/stores/useAuthStore";

export const useAuth = () => {
  const authStore = useAuthStore();

  const login = async (email: string, password: string) => {
    console.log('tired');
    await authStore.login(email, password)
  }

  const register = async (username: string, email: string, password: string) => {
    await authStore.register(username, email, password)
  }

  const logout = () => {
    authStore.logout()
  }

  const fetchUser = async () => {
    await authStore.getUser()
  }

  const updateUser = async (userData: any) => {
    await authStore.updateUser(userData)
  }

  const deleteUser = async (id: number) => {
    await authStore.deleteUser(id)
  }

  return { 
    login, 
    register, 
    logout, 
    fetchUser, 
    updateUser, 
    deleteUser, 
    user: authStore.user, 
    isLoggedIn: authStore.isLoggedIn,
    loading: authStore.loading
  }
}