<template>
    <div>
        <h1>Liste des utilisateurs</h1>

        <div v-if="loading">Chargement des utilisateurs...</div>

        <div v-else-if="error">
            <p>Erreur lors du chargement : {{ error.message }}</p>
            <p v-if="error.statusCode === 401">
                L'accès à cette liste nécessite d'être connecté. Veuillez vous 
                <NuxtLink to="/login">connecter</NuxtLink>.
            </p>
        </div>

        <ul v-else-if="users && users.length">
            <li v-for="user in users" :key="user._id || user.id">
                <NuxtLink :to="`/users/${user._id || user.id}`">
                    {{ user.name }} ({{ user.email }})
                </NuxtLink>
            </li>
        </ul>

        <div v-else>
            <p>Aucun utilisateur trouvé.</p>
        </div>
    </div>
</template>

<script setup>
    import { useUsers } from '~/composables/useUsers';

    const { getAllUsers } = useUsers();

    const {data: users, pending: loading, error} = await useAsyncData('all-users', () => getAllUsers());
</script>
    
<style scoped>

</style>