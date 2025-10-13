import { useUserStore } from "~/stores/useUserStore";
import { computed } from "vue";

interface User {
    id: number;
    name: string;
    email: string;
}

export function useUsers() {
    const userStore = useUserStore();
    const users = ref([]);

    const getUserFromStore = () => {
        const stored = localStorage.getItem('users');
        users.value = stored ? JSON.parse(stored) : [];
    }

    const getUserById = (id: number) => {
        return users.value.find((user: User) => user.id === id);
    }

    return {
        users,
        getUserFromStore,
        getUserById
    }
}