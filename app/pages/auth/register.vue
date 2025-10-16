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

            <div v-if="successMessage">{{ sucessMessage }}</div>

            <button type="submit" :disabled="isLoading">
                <span v-if="isLoading">Inscription en cours</span>
                <span v-else>S'inscrire</span>
            </button>
        </form>

        <p>
            Vous avez déjà un compte ?
            <NuxtLink to="auth/login">Se connecter</NuxtLink>
        </p>
    </div>
</template>

<script setup>
    import api from '~/services/api.ts';
    import {useRouter} from 'vue-router';

    const router = useRouter();

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
            const response = await api('/auth/register', {
                method: 'POST',
                body: formData 
            });
            console.log('Inscription réussite', response.data);
        } catch (error) {
            console.log('Erreur d\'inscription: ', error);
            const backendErr = error.data?.message;

            if(backendErr) {
                errorMessage.value = backendErr;
            } else {
                errorMessage.value = "Une erreur est survenue lors de l'inscription";
            }
        } finally {
            isLoading.value = false;
        }
    }
</script>

<style scoped>

</style>