import { useUserStore } from "~/stores/useUserStore";
import { computed } from "vue";
import api from '~/services/api';

interface User {
    _id: string;
    name: string;
    email: string;
}

interface UserData {
    name?: string;
    email?:string;
    password?: string;
}

export function useUsers() {
    const fetchUserById = async (userId: string) => {
        try {
            const response = await api(`/users/${userId}`);
            return response;
        } catch (error) {
            console.log('Failed to fetch user', error);
            throw error;
        }
    }

    const getLoggedUser = async () => {
        try {
            const user = await api(`/users/me`);
            return user as User;
        } catch (error) {
            console.log('Failed to fetch logged user', error);
            throw error;
        }
    }

    const getAllUsers = async () => {
        try {
            const users = await api('/users');
            return users as User[];
        } catch (error) {
            console.log('Failed to fetch all users', error);
            throw error;
        }
    }

    const modifyUser = async (userId: string, data: UserData): Promise<User> => {
        try {
            const updatedUser = await api(`/users/${userId}`, {
                method: 'PUT',
                body: data, 
            });
            return updatedUser as User;
        } catch (error) {
            console.error(`Failed to modify user ${userId}`, error);
            throw error;
        }
    }

    const deleteUser = async (userId: string): Promise<boolean> => {
        const store = useUserStore();
        
        try {
            await api(`/users/${userId}`, {
                method: 'DELETE',
            });
            
            if (store.loggedUser?._id === userId) {
                store.logoutUser();
            }
            
            return true;
        } catch (error) {
            console.error(`Failed to delete user ${userId}`, error);
            throw error;
        }
    }

    return {
        fetchUserById,
        getAllUsers,
        modifyUser,
        deleteUser,
        getLoggedUser
    }
    // const userStore = useUserStore();
    // const users = ref([]);

    // const getUserFromStore = () => {
    //     const stored = localStorage.getItem('users');
    //     users.value = stored ? JSON.parse(stored) : [];
    // }

    // const getUserById = (id: number) => {
    //     return users.value.find((user: User) => user.id === id);
    // }

    // return {
    //     users,
    //     getUserFromStore,
    //     getUserById
    // }
}