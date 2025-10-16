<template>
    <div>
        <section v-if="user">
            <h2 v-if="isLoggedUser">C'est moi !</h2>
            <!-- <p>ID : {{ user.id }}</p> -->
            <p>Nom : {{ user.name }}</p>
            <p>Email : {{ user.email }}</p>
            <div>
                <button v-if="isLoggedUser" @click="edit">Modifier mon profil</button>
                <button v-if="isLoggedUser">Supprimer mon profil</button>
                <button v-if="!isLoggedUser">Contacter</button>
            </div>
        </section>

        <section v-else>
            <p>Aucun utilisateur connecté.</p>
        </section>
    </div>
</template>

<script setup>
    import { useRoute } from 'vue-router';
    import { useUserStore } from '~/stores/useUserStore';
    import { useUsers } from '~/composables/useUsers';
    import { ref, computed, onMounted } from 'vue';
    import { useAuth } from '~/stores/useAuth';

    const route = useRoute();
    // console.log(route.params);
    const userId = route.params.id;

    const store = useUserStore();

    onMounted(() => {
        if (import.meta.client) {
            store.fromStorage(); 
        }
    });

    const {fetchUserById} = useUsers();
    // const user = ref(null);
    // const loading = ref(true);

    const {data: user, pending: loading, error} = await useAsyncData(
        `user-${userId}`,
        () => fetchUserById(userId)
    )
    
    const isLoggedUser = computed(() => {
        return user.value && store.isLoggedUser(user.value.id);
    });

    const edit = () => {
        navigateTo(`/users/${userId}`);
    }

    // onMounted(() => {
    //     user.value = fetchUserById(userId);
    //     if(!localStorage.getItem('users')) {
    //         localStorage.setItem('users', JSON.stringify(
    //             [
    //                 { id: 2, name: 'Paul', email: 'paul@gmail.com'},
    //                 { id: 3, name: 'Blanche', email: 'blanche@gmail.com'}
    //             ]
    //         ));
    //     }

    //     getUserFromStore();

    //     if(store.isLoggedUser(userId)) {
    //         user.value = store.loggedUser;
    //     } else {
    //         user.value = getUserById(userId);
    //     }
    // });
</script>

<style scoped>

</style>