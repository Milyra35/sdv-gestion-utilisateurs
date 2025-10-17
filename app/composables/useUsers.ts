import { useUserStore } from "~/stores/useUserStore";

export const useUsers = () => {
    const userStore = useUserStore()
  
    const getUsers = () => userStore.getUsers()
    
    const getUserById = (id: any) => userStore.users.find((u) => u._id === id)
  
    return {
      users: computed(() => userStore.users),
      loading: computed(() => userStore.loading),
      error: computed(() => userStore.error),
      getUsers,
      getUserById,
    }
}