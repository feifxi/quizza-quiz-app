import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getUserById } from '@/api/usersAPI'

export const useAuthStore = defineStore('auth', () => {
  const authUser = ref(null)
  const isAuthenticated = ref(false)

  const checkAuth = async () => {
    const userId = localStorage.getItem('userId')
    if (!userId) return
    // console.log('checkAuth : ' , userId)

    const res = await getUserById(userId)
    if (res.success) {
      authUser.value = res.data
      isAuthenticated.value = true
    }
  }

  const setAuthUser = (userData) => {
    if (userData) {
      authUser.value = userData
      isAuthenticated.value = true
    }
    else {
      authUser.value = null
      isAuthenticated.value = false
    }
  }

  return { authUser, isAuthenticated, checkAuth, setAuthUser }
})