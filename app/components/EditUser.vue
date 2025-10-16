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

<script setup lang="ts">
    import { ref, reactive, onMounted } from 'vue';
    import { useUserStore } from '~/stores/useUserStore';
    import { useUsers } from '~/composables/useUsers';

    const store = useUserStore();
    const { getLoggedUser, modifyUser } = useUsers();
    
    const loading = ref(true);
    const isSubmitting = ref(false);
    const error = ref<any>(null);
    const success = ref(false);

    const formData = reactive({
        name: '',
        email: '',
    });

    onMounted(async () => {
        if (import.meta.client) {
            store.fromStorage();
        }
        
        if (!store.loggedUser) {
            await navigateTo('/login'); 
            return;
        }
        
        try {
            const user = await getLoggedUser();
            formData.name = user.name;
            formData.email = user.email;
        } catch (e) {
            error.value = e;
        } finally {
            loading.value = false;
        }
    });

    const handleUpdate = async () => {
        if (!store.loggedUser) return;
        
        isSubmitting.value = true;
        error.value = null;
        success.value = false;
        
        try {
            const updatedUser = await modifyUser(store.loggedUser._id, formData);
            success.value = true;
        } catch (e) {
            error.value = e;
        } finally {
            isSubmitting.value = false;
        }
    };
</script>

<style scoped>

</style>