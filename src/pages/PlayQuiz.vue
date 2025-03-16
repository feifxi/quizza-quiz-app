<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const { quizId } = route.params
const { level } = route.query

</script>

<template>
  <section>
    <h1>Play Quiz : {{ quizId }}</h1>
    <h1>Level : {{ level }}</h1>
  </section>
</template>

<style scoped>
</style>