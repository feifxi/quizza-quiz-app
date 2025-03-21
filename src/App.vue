<script setup>
import { onBeforeMount, ref } from 'vue';
import Navbar from './components/Navbar.vue';
import { useAuthStore } from '@/stores/user';
import Chatbot from './components/Chatbot.vue';

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

  <main v-else class="min-h-screen bg-gradient-to-b from-green-100 to-white">
    <Navbar />
    <RouterView />
    <!-- <Chatbot /> -->
  </main>
</template>

<style scoped></style>
