<script setup lang="ts">
import { useAuthStore } from './stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <template v-if="!auth.isLoggedIn">
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Sign Up</router-link>
    </template>
    <template v-else>
      <span>Welcome, {{ auth.user }}</span>
      <button @click="handleLogout">Logout</button>
    </template>
  </nav>
  <router-view />
</template>
