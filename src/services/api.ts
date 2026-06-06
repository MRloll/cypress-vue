const BASE_URL = 'https://jsonplaceholder.typicode.com'

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export async function fetchPosts(): Promise<Post[]> {
  const response = await fetch(`${BASE_URL}/posts?_limit=10`)
  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.status}`)
  }
  return response.json()
}
