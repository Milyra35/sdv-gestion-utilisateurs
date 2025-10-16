<template>
    <div>
        <h1>Connexion</h1>
        <form @submit.prevent="handleLogin">
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

            <button type="submit" :disabled="isLoading">
                <span v-if="isLoading">Connexion en cours</span>
                <span v-else>Se connecter</span>
            </button>
        </form>

        <p>
            <NuxtLink to="/auth/register">Créer un compte</NuxtLink>
        </p>
    </div>
</template>

<script setup>
    import api from '~/services/api.ts';

    const formData = reactive({
        email: '',
        password: ''
    });

    const isLoading = ref(false);
    const errorMessage = ref('');

    const handleLogin = async () => {
        isLoading.value = true;
        errorMessage.value = '';

        try {
            const response = await api('/auth/login', {
                method: 'POST',
                body: formData 
            });
            console.log('Login successfull', response.data);

            const token = response.token;

            if(token) {
                localStorage.setItem('auth_token', token);
                await navigateTo('/users/me');
            }
        } catch (error) {
            errorMessage.value = error.data?.message;
            console.log('Error creating a user', error);
        }
    }
</script>

<style scoped>

</style>