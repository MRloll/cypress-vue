<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

const username = ref('')
const password = ref('')

function handleLogin() {
  auth.login(username.value, password.value)
  router.push('/')
}
</script>

<template>
  <main>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <label>
        Username
        <input v-model="username" type="text" data-testid="login-username" required />
      </label>
      <label>
        Password
        <input v-model="password" type="password" data-testid="login-password" required />
      </label>
      <button type="submit" data-testid="login-submit">Log In</button>
    </form>
    <p>Don't have an account? <router-link to="/signup">Sign up</router-link></p>
  </main>
</template>
