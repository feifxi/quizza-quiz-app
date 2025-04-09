<script setup>
import { useRouter } from 'vue-router';
import Button from '@/components/Button.vue';

const router = useRouter();
const home = () => {
  router.push("/");
}
</script>

<template>
  <section class="text-3xl font-bold text-neutral-400 text-center mt-10 flex flex-col items-center">
    <h1 class="text-3xl font-bold text-center text-red-600">Page Not Found</h1>
    <p class="text-2xl font-bold text-center">Error 404</p>
    <div class="max-w-3xl p-3">
      <Button label="Back To Home" :click="home"></Button>
    </div>
  </section>
</template>

<style scoped></style>
