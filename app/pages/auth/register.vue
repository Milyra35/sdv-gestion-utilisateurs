<template>
    <div>
        <h1>Inscription</h1>
        <form @submit.prevent="handleRegister">
            <fieldset>
                <label for="name">Nom :</label>
                <input
                    v-model="formData.name"
                    type="text"
                    id="name"
                    name="name"
                    required
                    :disabled="isLoading"
                />
            </fieldset>

            <fieldset>
                <label for="email">Email :</label>
                <input
                    v-model="formData.email"
                    type="email"
                    id="email"
                    name="email"
                    required
                    :disabled="isLoading"
                />
            </fieldset>

            <fieldset>
                <label for="password">Mot de passe :</label>
                <input
                    v-model="formData.password"
                    type="password"
                    id="password"
                    name="password"
                    required
                    :disabled="isLoading"
                />
            </fieldset>

            <div v-if="errorMessage">{{ errorMessage }}</div>

            <div v-if="successMessage">{{ successMessage }}</div>

            <button type="submit" :disabled="isLoading">
                <span v-if="isLoading">Inscription en cours</span>
                <span v-else>S'inscrire</span>
            </button>
        </form>

        <p>
            Vous avez déjà un compte ?
            <NuxtLink to="/auth/login">Se connecter</NuxtLink>
        </p>
    </div>
</template>

<script setup>
    import { useAuthStore } from '~/stores/useAuthStore';
    import { useAuth } from '~/composables/useAuth';

    const auth = useAuthStore();
    const { register } = useAuth();

    const formData = reactive({
        name: '',
        email: '',
        password: ''
    });

    const isLoading = ref(false);
    const errorMessage = ref('');
    const successMessage = ref('');

    const handleRegister = async () => {
        isLoading.value = true;
        errorMessage.value = '';
        successMessage.value = '';

        try {
            await register(formData.name, formData.email, formData.password);
            navigateTo('/users');
        } catch (error) {
            errorMessage.value = error.message || 'Erreur de création de user';
        } finally {
            isLoading.value = false;
        }
    }
</script>

<style scoped>

</style>