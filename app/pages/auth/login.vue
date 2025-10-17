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
    import { useAuthStore } from '~/stores/useAuthStore';
    import { useAuth } from '~/composables/useAuth';

    const formData = reactive({
        email: '',
        password: ''
    });

    const router = useRouter();
    const { login } = useAuth();
    const isLoading = ref(false);
    const errorMessage = ref('');
    const auth = useAuthStore();

    async function handleLogin () {
        isLoading.value = true;
        errorMessage.value = '';

        try {
            await login(formData.email, formData.password);
            if (auth.user._id) {
                console.log(auth.user._id);
                navigateTo('/users');
            } else {
                console.log(auth.error);
                errorMessage.value = auth.error || 'Erreur de connexion';
            }

        } catch (error) {
            errorMessage.value = error.message || 'Erreur de connexion';
        } finally {
            isLoading.value = false;
        }
    }
    
</script>

<style scoped>

</style>