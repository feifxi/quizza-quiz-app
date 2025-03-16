<script setup>
import { onBeforeMount, ref } from 'vue';
import Navbar from './components/Navbar.vue';
import { useAuthStore } from '@/stores/user';

const authStore = useAuthStore()
const isLoading = ref(false)

onBeforeMount(async () => {
  isLoading.value = true
  await authStore.checkAuth()
  isLoading.value = false
})
</script>

<template>
  <div v-if="isLoading">
    Loading...
  </div> 

  <main v-else>
    <Navbar />
    <RouterView />
  </main>
</template>

<style scoped>
</style> 
