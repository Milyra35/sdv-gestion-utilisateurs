<template>
    <div>
        <h1>Liste des utilisateurs</h1>

        <!-- <div v-if="loading">Chargement des utilisateurs...</div> -->

        <!-- <div v-else-if="error">
            <p>Erreur lors du chargement : {{ error.message }}</p>
            <p v-if="error.statusCode === 401">
                L'accès à cette liste nécessite d'être connecté. Veuillez vous 
                <NuxtLink to="/login">connecter</NuxtLink>.
            </p>
        </div> -->

        <ul>
            <li v-for="user in users" :key="user._id || user.id">
                <NuxtLink :to="`/users/${user._id || user.id}`">
                    {{ user.name }} ({{ user.email }})
                </NuxtLink>
                <button @click="onDelete(user._id || user.id)">Supprimer</button>
            </li>
        </ul>

        <!-- <div v-else>
            <p>Aucun utilisateur trouvé.</p>
        </div> -->
    </div>
</template>

<script setup>
    import { useUsers } from '~/composables/useUsers';

    // const { getUsers } = useUsers();

    // const {data: users, pending: loading, error} = await useAsyncData('all-users', () => getUsers());
    const {users, getUsers } = useUsers();
    onMounted(getUsers)

    const onDelete = async (id) => {
        try {
            await deleteUser(id);
            await refreshNuxtData('all-users');
        } catch (error) {
            console.log('Error deleting the user', error);
            throw error;
        }
    }
</script>
    
<style scoped>

</style>