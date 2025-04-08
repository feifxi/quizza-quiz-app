<script setup>
import Navbar from './components/Navbar.vue';
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/user';

const authStore = useAuthStore()
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  await authStore.checkAuth()
  isLoading.value = false
})
</script>

<template>
  <div v-if="isLoading">
    Loading...
  </div>

  <main v-else class="min-h-screen bg-gradient-to-b from-green-100 to-white">
    <Navbar />
    <RouterView />
  </main>
</template>

<style scoped></style>
