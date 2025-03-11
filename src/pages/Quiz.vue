<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const id = route.params.gameId


</script>

<template>
  <section>
    <h1>Play Quiz</h1>
  </section>
</template>

<style scoped>
</style>