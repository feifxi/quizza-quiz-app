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

  <main v-else class="bg-neutral-100 min-h-screen">
    <Navbar />
    <RouterView />
    <!-- <Chatbot /> -->
  </main>
</template>

<style scoped></style>
