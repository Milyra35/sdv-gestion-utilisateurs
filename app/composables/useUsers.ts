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

// interface User {
//     _id: string;
//     name: string;
//     email: string;
// }

// interface UserData {
//     name?: string;
//     email?:string;
//     password?: string;
// }

// export function useUsers() {
//     const fetchUserById = async (id: string) => {
//         try {
//             const response = await api(`/users/${id}`);
//             return response;
//         } catch (error) {
//             console.log('Failed to fetch user', error);
//             throw error;
//         }
//     }

//     const getLoggedUser = async () => {
//         try {
//             const user = await api(`/users/me`);
//             return user as User;
//         } catch (error) {
//             console.log('Failed to fetch logged user', error);
//             throw error;
//         }
//     }

//     const getAllUsers = async () => {
//         try {
//             const users = await api('/users');
//             return users as User[];
//         } catch (error) {
//             console.log('Failed to fetch all users', error);
//             throw error;
//         }
//     }

//     const modifyUser = async (userId: string, data: UserData): Promise<User> => {
//         try {
//             const updatedUser = await api(`/users/${userId}`, {
//                 method: 'PUT',
//                 body: data, 
//             });
//             return updatedUser as User;
//         } catch (error) {
//             console.error(`Failed to modify user ${userId}`, error);
//             throw error;
//         }
//     }

//     const deleteUser = async (userId: string): Promise<boolean> => {
//         const store = useAuthStore();
        
//         try {
//             await api(`/users/${userId}`, {
//                 method: 'DELETE',
//             });
            
//             if (store.user?._id === userId) {
//                 store.logout();
//             }
            
//             return true;
//         } catch (error) {
//             console.error(`Failed to delete user ${userId}`, error);
//             throw error;
//         }
//     }

//     return {
//         fetchUserById,
//         getAllUsers,
//         modifyUser,
//         deleteUser,
//         getLoggedUser
//     }
// }