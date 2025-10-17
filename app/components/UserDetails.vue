<template>
    <div>
        <section v-if="user">
            <h2 v-if="isLoggedUser">C'est moi !</h2>
            <!-- <p>ID : {{ user.id }}</p> -->
            <p>Nom : {{ user.name }}</p>
            <p>Email : {{ user.email }}</p>
            <div>
                <button v-if="isLoggedUser" @click="edit">Modifier mon profil</button>
                <button v-if="isLoggedUser" @click="removeUser">Supprimer mon profil</button>
                <button v-if="!isLoggedUser">Contacter</button>
            </div>
        </section>

        <section v-else>
            <p>Aucun utilisateur connecté.</p>
        </section>

        <section v-if="edit">
            <EditUser />
        </section>
    </div>
</template>

<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import { useUserStore } from '~/stores/useUserStore';
    import { useUsers } from '~/composables/useUsers';
    import { ref, computed, onMounted } from 'vue';
    import { useAuthStore } from '~/stores/useAuthStore';

    const route = useRoute();
    const router = useRouter();
    const userId = route.params.id;

    const store = useAuthStore();
    const { getUserById, getUsers } = useUsers();
    const user = ref(null);
    // const loading = ref(true);

    // const {data: user, pending: loading, error} = await useAsyncData(
    //     `user-${userId}`,
    //     () => fetchUserById(userId)
    // )
    const isLoggedUser = computed(() => user.value ? store.getUser(user.value._id) : false)

    onMounted(() => {
        getUsers();
        
        if (store.getUser(userId)) {      
            user.value = store.user;
        } else {      
            user.value = getUserById(userId);
        }
    })

    const edit = () => {
        navigateTo(`/users/${userId}`);
    }

    const removeUser = async () => {
        if(!user.value?._id && !user.value?.id) return;
        
        if (confirm("Êtes-vous sûr de vouloir supprimer votre profil ? Cette action est irréversible.")) {
            try {
                await deleteUser(user.value._id);
                await router.push('/auth/login');
            } catch (error) {
                console.error("Erreur lors de la suppression de l'utilisateur", error);
                throw error;
            }
        }
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