<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')

function handleSignUp() {
  auth.login(username.value, password.value)
  router.push('/')
}
</script>

<template>
  <main>
    <h1>Sign Up</h1>
    <form @submit.prevent="handleSignUp">
      <label>
        Username
        <input v-model="username" type="text" data-testid="signup-username" required />
      </label>
      <label>
        Email
        <input v-model="email" type="email" data-testid="signup-email" required />
      </label>
      <label>
        Password
        <input v-model="password" type="password" data-testid="signup-password" required />
      </label>
      <button type="submit" data-testid="signup-submit">Sign Up</button>
    </form>
    <p>Already have an account? <router-link to="/login">Log in</router-link></p>
  </main>
</template>
