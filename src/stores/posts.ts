import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchPosts, type Post } from '../services/api'
import { useAuthStore } from './auth'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Post[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadPosts() {
    const auth = useAuthStore()
    if (!auth.isLoggedIn) return

    loading.value = true
    error.value = null
    try {
      posts.value = await fetchPosts()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load posts'
    } finally {
      loading.value = false
    }
  }

  return { posts, loading, error, loadPosts }
})
