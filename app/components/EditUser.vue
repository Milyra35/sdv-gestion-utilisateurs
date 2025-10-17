<template>
    <div>
        <h1>Modifier mon profil</h1>
        
        <div v-if="loading">Chargement des données...</div>
        <form v-else @submit.prevent="handleUpdate">
            
            <fieldset>
                <label for="name">Nom:</label>
                <input v-model="formData.name" id="name" type="text" required />
            </fieldset>

            <fieldset>
                <label for="email">Email:</label>
                <input v-model="formData.email" id="email" type="email" required />
            </fieldset>
            
            <button type="submit" :disabled="isSubmitting">
                {{ isSubmitting ? 'Mise à jour...' : 'Sauvegarder les modifications' }}
            </button>
            
            <p v-if="error" class="error">Erreur: {{ error.message }}</p>
            <p v-if="success" class="success">Profil mis à jour avec succès !</p>
        </form>
    </div>
</template>

<script setup>
    import { ref, reactive, onMounted } from 'vue';
    import { useUserStore } from '~/stores/useUserStore';
    import { useUsers } from '~/composables/useUsers';
    import { useAuthStore } from '~/stores/useAuthStore';

    const store = useAuthStore();
    const { getUserById } = useUsers();
    
    const loading = ref(true);
    const isSubmitting = ref(false);
    const error = ref(null);
    const success = ref(false);

    const formData = reactive({
        name: '',
        email: '',
    });

    onMounted(async () => {
        // Vérification basique si l'utilisateur est connecté
        // Vous devrez peut-être adapter cette logique selon votre système d'authentification
        const loggedUserId = localStorage.getItem('loggedUserId'); // ou autre méthode
        if (!loggedUserId) {
            await navigateTo('/auth/login'); 
            return;
        }
        
        try {
            // Récupérer l'utilisateur depuis le store
            const user = getUserById(loggedUserId);
            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }
            formData.name = user.name;
            formData.email = user.email;
        } catch (error) {
            error.value = error.message || 'Erreur lors du chargement';
        } finally {
            loading.value = false;
        }
    });

    const handleUpdate = async () => {
        const loggedUserId = localStorage.getItem('loggedUserId');
        if (!loggedUserId) {
            error.value = 'Utilisateur non connecté';
            return;
        }
        
        isSubmitting.value = true;
        error.value = null;
        success.value = false;
        
        try {
            // Utiliser l'API directement pour modifier l'utilisateur
            const { $api } = useNuxtApp();
            const response = await $api(`/users/${loggedUserId}`, {
                method: 'PUT',
                body: formData
            });
            
            // Mettre à jour le store localement
            const userIndex = store.users.findIndex(u => u._id === loggedUserId);
            if (userIndex !== -1) {
                store.users[userIndex] = { ...store.users[userIndex], ...formData };
            }
            
            success.value = true;
        } catch (error) {
            error.value = error.message || 'Erreur lors de la mise à jour';
        } finally {
            isSubmitting.value = false;
        }
    };

    // onMounted(async () => {
    //     if (!store.isAuthenticated) {
    //         await navigateTo('/auth/login'); 
    //         return;
    //     }
        
    //     try {
    //         const user = await getUserById();
    //         formData.name = user.name;
    //         formData.email = user.email;
    //     } catch (e: any) {
    //         error.value = e.message || 'Erreur lors du chargement';
    //     } finally {
    //         loading.value = false;
    //     }
    // });

    // const handleUpdate = async () => {
    //     if (!store.loggedUser) return;
        
    //     isSubmitting.value = true;
    //     error.value = null;
    //     success.value = false;
        
    //     try {
    //         const updatedUser = await modifyUser(store.loggedUser._id, formData);
    //         success.value = true;
    //     } catch (e) {
    //         error.value = e;
    //     } finally {
    //         isSubmitting.value = false;
    //     }
    // };
</script>

<style scoped>

</style>