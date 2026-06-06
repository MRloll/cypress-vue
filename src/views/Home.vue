<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { usePostsStore } from '../stores/posts'
import { onMounted, watch } from 'vue'

const auth = useAuthStore()
const postsStore = usePostsStore()

onMounted(() => {
  postsStore.loadPosts()
})

watch(() => auth.isLoggedIn, () => {
  postsStore.loadPosts()
})
</script>

<template>
  <main>
    <h1>Cypress Vue E2E Demo</h1>
    <p v-if="!auth.isLoggedIn">Welcome to the app. Use the navigation above to log in or sign up.</p>

    <div v-else>
      <p data-testid="greeting">Welcome, {{ auth.user }}! Here are your latest posts:</p>

      <div v-if="postsStore.loading" data-testid="loading">Loading posts...</div>
      <div v-else-if="postsStore.error" data-testid="error">{{ postsStore.error }}</div>
      <ul v-else data-testid="posts-list">
        <li v-for="post in postsStore.posts" :key="post.id" data-testid="post-item">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </li>
      </ul>
    </div>
  </main>
</template>
